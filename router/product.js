const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController')

router.get('/search/:id', ProductController.search);
router.get('/image/:id', ProductController.getImage);
router.get('/create', ProductController.create);
router.get('/', ProductController.index);

module.exports = router;