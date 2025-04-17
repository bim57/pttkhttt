import adminRoutes from "./admin.route.js";
function route(app) {
  app.use("/admin", adminRoutes); // Quản lý tài khoản người dùng

  app.get("/", (req, res) => {
    res.redirect("/admin");
  });

  app.use((req, res) => {
    res.status(404).send("404 - Không tìm thấy trang");
  });
}

export default route;
