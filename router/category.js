const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController')

router.get('/search/:id', CategoryController.search);

router.get('/view/:id', CategoryController.view);

router.get('/create', CategoryController.create);

router.post('/store', CategoryController.store);

router.get('/delete/:id', CategoryController.delete);

router.get('/', CategoryController.index);

module.exports = router;