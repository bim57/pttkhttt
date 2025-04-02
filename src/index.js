import express from "express";
import loginRoutes from "./routes/login.routes.js";
import hbs from "express-handlebars";
// import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import route from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "resources", "views", "partials"),
    helpers: {
      block: function (name, options) {
        if (!this._blocks) {
          this._blocks = {};
        }
        // @ts-ignore
        this._blocks[name] = options.fn(this);
        return null;
      },
      formatCurrentDate: function (value) {
        // Check if value is valid
        if (!value) {
          return "Invalid date";
        }

        const date = new Date(value);

        // Check if date is valid
        if (isNaN(date.getTime())) {
          return "Invalid date";
        }

        const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return dateFormatter.format(date) + " " + timeFormatter.format(date);
      },
      formatCurrency: function (value) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },
      statusClass: function (status) {
        const statusMap = {
          "Chờ xác nhận": "status-pending",
          "Chờ lấy hàng": "status-processing",
          "Đang giao hàng": "status-shipping",
          "Đã giao": "status-completed",
          "Đã hủy": "status-cancelled",
          "Trả hàng": "status-returned",
          "Đã thanh toán": "payment-paid",
          "Chưa thanh toán": "payment-unpaid",
          "Đã hoàn tiền": "payment-refunded",
          "Chưa hoàn tiền": "payment-not-refunded",
        };
        return statusMap[status] || "";
      },
      multi: (a, b) => a * b,
      eq: (a, b) => a === b,
      or: function () {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// gắn router vào app
route(app);
// bây giời nếu vào đường dẫn /api/login sẽ vào file login.routes.js
app.use("api", loginRoutes);

// chạy server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
