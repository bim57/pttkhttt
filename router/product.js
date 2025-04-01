// const express = require('express');
// const ProductController = require('../controller/ProductController');
import express from 'express';
const router = express.Router();
import ProductController from '../controller/ProductController.js';

router.get('/search/:id', ProductController.search);

router.get('/view/:id', ProductController.view);

router.get('/create', ProductController.create);

router.post('/store', ProductController.store);

router.get('/update/:id', ProductController.update);

router.post('/edit', ProductController.edit);

router.get('/delete/:id', ProductController.delete);

router.get('/', ProductController.index);

// module.exports = router;
export default router;