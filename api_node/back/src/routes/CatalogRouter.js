const { Router } = require('express');

const router = Router();

const { storeCatalog, getCatalog } = require('../controllers/CatalogController');

router.post('/store/catalog', storeCatalog);

router.get('/get/catalog', getCatalog);

module.exports = router;