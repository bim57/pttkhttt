import generateOrderPdf from "../services/pdfService.js";
import { Order } from "../models/Order.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { generateOrdersExcel } from "../services/excelService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class OrderController {
  async show(req, res) {
    try {
      const query = req.query;
      const orderModel = new Order();

      orderModel
        .findAll(query)
        .then((orders) => {
          res.render("orders/show", {
            title: "Order",
            cssFiles: ["/css/order.css", "/css/style.css"],
            jsFiles: ["/js/index.js"],
            orders,
            query,
          });
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          res.status(500).send("Server error");
        });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).send("Server error");
    }
  }

  async showById(req, res, next) {
    try {
      const orderModel = new Order();
      const orderId = req.params.id;
      const orderDetails = await orderModel._findById(orderId);
      // res.json(orderDetails);
      res.render("orders/detail", {
        title: "Order Details",
        cssFiles: ["/css/orderAnother.css", "/css/style.css"],
        jsFiles: ["/js/index.js", "/js/orders.js"],
        orderDetails,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  updateStatus(req, res, next) {
    try {
      const orderId = req.params.id;
      const status = req.body.status || req.query.status;
      console.log("status", status);
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Trạng thái không được cung cấp",
        });
      }

      const orderModel = new Order();
      orderModel
        ._updateStatus(orderId, status)
        .then((result) => {
          console.log(result);
          res.json({
            success: true,
            message: `Đơn hàng đã được cập nhật thành "${status}" thành công`,
          });
        })
        .catch(() => {
          res.status(404).json({
            success: false,
            message: "Đơn hàng không tồn tại",
          });
        });
    } catch (error) {
      console.error("Error updating order status:", error);
      next(error);
    }
  }

  async updateArchive(req, res, next) {
    try {
      const orderId = req.params.id;
      const status = req.body.status || req.query.status;
      console.log("status", status);
      if (status === undefined || status === null) {
        return res.status(400).json({
          success: false,
          message: "Trạng thái không được cung cấp",
        });
      }

      const orderModel = new Order();
      orderModel
        ._updateArchive(orderId, status)
        .then((result) => {
          console.log(result);
          res.json({
            success: true,
            message: `Đơn hàng đã được cập nhật thành công`,
          });
        })
        .catch(() => {
          res.status(404).json({
            success: false,
            message: "Đơn hàng không tồn tại",
          });
        });
    } catch (error) {
      console.error("Error updating order status:", error);
      next(error);
    }
  }

  async exportOrderPdf(req, res, next) {
    try {
      console.log("Exporting PDF...");
      const orderId = req.params.id;
      const orderModel = new Order();
      const orderDetails = await orderModel._findById(orderId);

      if (!orderDetails) {
        return res.status(404).json({
          success: false,
          message: "Đơn hàng không tồn tại",
        });
      }

      console.log("orderDetails", orderDetails);

      const result = await generateOrderPdf(orderDetails);
      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: "Lỗi khi tạo PDF",
        });
      }

      // Use full file path for the PDF
      if (!result.fileName) {
        return res.status(500).json({
          success: false,
          message: "File name is undefined",
        });
      }

      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "exports",
        result.fileName
      );

      // Set headers for file download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${result.fileName}`
      );

      // Send the file as a stream and don't try to send JSON response afterward
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      // Important: Remove the JSON response here as it conflicts with the file stream
    } catch (error) {
      console.error("Error exporting PDF:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi xuất PDF",
      });
    }
  }

  async exportOrdersExcel(req, res, next) {
    try {
      const query = req.query;
      const orderModel = new Order();
      const orders = await orderModel.findAll(query);
      if (!orders) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy đơn hàng",
        });
      }

      const result = await generateOrdersExcel(orders);

      if (!result.success || !result.fileName) {
        return res.status(500).json({
          success: false,
          message: "Lỗi khi tạo Excel",
        });
      }

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      // Fix: Corrected the Content-Disposition header format
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${result.fileName}`
      );

      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "exports",
        result.fileName
      );
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi xuất Excel",
      });
    }
  }
}
export default new OrderController();
