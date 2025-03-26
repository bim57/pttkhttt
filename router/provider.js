const express = require('express');
const router = express.Router();
const ProviderController = require('../controller/ProviderController');

router.get('/search/:id', ProviderController.search);

router.get('/create', ProviderController.create);

router.post('/store', ProviderController.store);

router.get('/update/:id', ProviderController.update);

router.post('/edit', ProviderController.edit);

router.get('/delete/:id', ProviderController.delete);

router.get('/', ProviderController.index);

module.exports = router;