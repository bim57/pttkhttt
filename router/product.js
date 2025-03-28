const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController')

router.get('/search/:id', ProductController.search);

router.get('/view/:id', ProductController.view);

router.get('/create', ProductController.create);

router.post('/store', ProductController.store);

router.get('/', ProductController.index);

module.exports = router;