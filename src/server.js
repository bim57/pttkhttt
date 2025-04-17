import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';

// Import routes
import adminRoutes from './admin/routes/admin.route.js';
//import roleRoutes from './admin/routes/role.route.js';

const app = express();
const __dirname = path.resolve();

// View engine setup
app.engine('hbs', engine({ 
  extname: '.hbs', 
  defaultLayout: false,  // Không dùng layout mặc định
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/admin/views')); // Đảm bảo thư mục views là chính xác

// Static files
app.use(express.static(path.join(__dirname, '/src/admin/public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/admin', adminRoutes);   // Quản lý tài khoản người dùng
//app.use('/roles', roleRoutes);    // Phân quyền người dùng

// Trang mặc định hoặc 404
app.get('/', (req, res) => {
  res.redirect('/admin');
});

app.use((req, res) => {
  res.status(404).send('404 - Không tìm thấy trang');
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
