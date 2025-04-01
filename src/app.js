// const express = require('express');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const moment = require('moment');
// const router = require('../router');

import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import moment from 'moment';
import router from '../router/index.js'; // Chú ý thêm `.js`
import { fileURLToPath } from 'url';

const app = express();

// Xử lý __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },        

        isChecked: function (categoryId, checkedCategories) {
            if (!Array.isArray(checkedCategories)) return "";
            const found = checkedCategories.some(cat => cat.DanhMucID == categoryId);
            return found ? "checked" : "";
        },

        formatDate: (timestamp, format) => {
            return moment(timestamp).format(format);
        }
    }
}));
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, 'public'))); // sử dụng file tĩnh

router(app); 

const port = 5000;
app.listen(port, () => {console.log(`Server is running at port ${port}`)});