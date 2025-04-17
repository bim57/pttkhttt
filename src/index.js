import express from "express";
import loginRoutes from "./routes/login.routes.js";
import hbs from "express-handlebars";
// import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import route from "./routes/index.js";
import hbsHelpers from "./services/helpers.js";

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
    helpers: hbsHelpers,
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
