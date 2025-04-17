import orderRouter from "./orders.js"; // Corrected import path

function route(app) {
  app.use("/orders", orderRouter);

  app.get("/", (req, res) => {
    res.render("dashboard", {
      title: "Dashboard",
      cssFiles: ["/css/style.css", "/css/order.css", "/css/dashboard.css"],
    });
  });
}

export default route;
