import express from "express";
import loginRoutes from "./routes/login.routes.js";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import route from "./routes/index.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Phục vụ file tĩnh từ thư mục public trong src
app.use(express.static(path.join(__dirname, "public")));

// Vẫn giữ cấu hình cũ để tương thích với code khác nếu có
app.use(express.static(path.join(dirname(__dirname), "public")));

// View engine setup
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: false,
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

route(app); // Gọi hàm route để sử dụng router

// gắn router vào app
// bây giời nếu vào đường dẫn /api/login sẽ vào file login.routes.js
// app.use("api", loginRoutes);

// chạy server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log("Views directory:", path.join(__dirname, "views"));
  console.log("Static files directory 1:", path.join(__dirname, "public"));
  console.log(
    "Static files directory 2:",
    path.join(dirname(__dirname), "public")
  );
});
