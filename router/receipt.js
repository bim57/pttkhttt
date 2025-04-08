// const express = require('express');
// const ReceiptController = require('../controller/ReceiptController');
import express from 'express';
const router = express.Router();
import ReceiptController from '../controller/ReceiptController.js';

// router.get('/search/:id', ReceiptController.search);

router.get('/search_provider', ReceiptController.search_provider);

router.get('/search_employee', ReceiptController.search_employee);

router.get('/search_product', ReceiptController.search_product);

router.get('/view/:id', ReceiptController.view);

router.get('/create', ReceiptController.create);

router.get('/', ReceiptController.index);

// module.exports = router;
export default router;