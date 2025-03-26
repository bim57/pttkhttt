const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('../router');

const app = express();

// cài đặt Handlebars
app.engine("hbs", exphbs.engine({ 
    extname: ".hbs",
    helpers: {
        block: function (name, options) {
            if (!this._blocks) this._blocks = {}; // Khởi tạo nếu chưa có
            this._blocks[name] = options.fn(this); // Lưu nội dung của block
            return null;
        },
        formatCurrency: (value) => {
            return new Intl.NumberFormat('vi-VN').format(value); // chuyển sang VND
        }
    }
}));
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // sử dụng file tĩnh

router(app); 

const port = 5000;
app.listen(port, () => {console.log(`Server is running at port ${port}`)});