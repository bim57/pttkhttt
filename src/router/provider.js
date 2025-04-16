// const express = require('express');
// const ProviderController = require('../controller/ProviderController');
import express from 'express';
const router = express.Router();
import ProviderController from '../controller/ProviderController.js';

router.get('/search', ProviderController.search);

router.get('/create', ProviderController.create);

router.post('/store', ProviderController.store);

router.get('/update/:id', ProviderController.update);

router.post('/edit', ProviderController.edit);

router.get('/delete/:id', ProviderController.delete);

router.get('/', ProviderController.index);

// module.exports = router;
export default router;