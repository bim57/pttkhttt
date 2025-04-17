import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateOrdersExcel(orders) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    worksheet.columns = [
      { header: "Mã đơn hàng", key: "IDHoaDonXuat", width: 20 },
      { header: "Tên khách hàng", key: "TenNguoiNhan", width: 30 },
      { header: "Số điện thoại", key: "SoDienThoai", width: 20 },
      { header: "Địa chỉ", key: "DiaChi", width: 75 },
      { header: "Ngày đặt hàng", key: "NgayXuat", width: 20 },
      { header: "Tổng tiền", key: "TongTien", width: 20 },
      { header: "Trạng thái đơn hàng", key: "TrangThaiDonHang", width: 20 },
      {
        header: "Phương thức thanh toán",
        key: "PhuongThucThanhToan",
        width: 20,
      },
      { header: "Tình trang thanh toán", key: "TinhTrangThanhToan", width: 20 },
    ];

    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" },
    };

    orders.forEach((order) => {
      worksheet.addRow({
        IDHoaDonXuat: order.IDHoaDonXuat,
        TenNguoiNhan: order.TenNguoiNhan,
        SoDienThoai: order.SoDienThoai,
        DiaChi: `${order.SoNhaDuong}, ${order.QuanHuyen}, ${order.TinhThanhPho}`,
        NgayXuat: order.NgayXuat,
        TongTien: order.TongTien,
        TrangThaiDonHang: order.TrangThaiDonHang,
        PhuongThucThanhToan: order.PhuongThucThanhToan,
        TinhTrangThanhToan: order.TinhTrangThanhToan,
      });
    });

    // Fix: Use the actual column keys defined in worksheet.columns
    worksheet.getColumn("NgayXuat").numFmt = "dd/mm/yyyy";
    worksheet.getColumn("TongTien").numFmt = "#,##0 ₫";

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `orders_${timestamp}.xlsx`;

    const exportsDir = path.join(__dirname, "..", "public", "exports");
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    const filePath = path.join(exportsDir, fileName);

    await workbook.xlsx.writeFile(filePath);
    return {
      success: true,
      fileName,
      filePath,
    };
  } catch (error) {
    console.error("Error generating Excel file:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
