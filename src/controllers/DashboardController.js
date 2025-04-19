import Dashboard from "../models/Dashboard.js";
import { Order } from "../models/Order.js";

class DashboardController {
  async show(req, res) {
    try {
      const dashboardModel = new Dashboard();
      const orderModel = new Order();

      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      startDate.setMonth(startDate.getMonth() - 1);

      const topProducts =
        (await dashboardModel.getTopProductsByDateRange(startDate, today)) ||
        [];

      const dashboard =
        (await dashboardModel.getDashboard(startDate, today)) || [];

      // Fetch revenue data for current month
      const revenueData = (await dashboardModel.getRevenueCurrentMonth()) || [];

      const currentOrders =
        (await orderModel.findAll({}, "date", "desc", 5)) || [];

      const data = {
        dashboard: dashboard[0],
        topProducts,
        currentOrders,
        revenueData,
      };

      res.render("dashboard", {
        title: "Dashboard",
        cssFiles: ["/css/style.css", "/css/order.css", "/css/dashboard.css"],
        data,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).send("Server error");
    }
  }
}

export default new DashboardController();
