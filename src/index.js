import express from "express";
import loginRoutes from "./routes/login.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// gắn router vào app
// bây giời nếu vào đường dẫn /api/login sẽ vào file login.routes.js
app.use("api", loginRoutes);

// chạy servẻ
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
