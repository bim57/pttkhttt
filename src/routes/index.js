import orderRouter from "./orders.js"; // Corrected import path
import DashboardController from "../controllers/DashboardController.js";

function route(app) {
  app.use("/orders", orderRouter);
  app.get("/", DashboardController.show);
}

export default route;
