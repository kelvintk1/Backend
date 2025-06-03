const express = require('express');
const {insertSampleProducts, getProductStats, getProductAnalysis} = require('../controllers/product-ctrl')

const router = express.Router();

router.post('/add', insertSampleProducts)
router.post('/stats', getProductStats)
router.get('/analysis', getProductAnalysis)

module.exports = router;