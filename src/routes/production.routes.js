const express = require('express');

const {
  getProduction,
  getProductionByIdController,
  createProductionController,
  updateProductionController,
  deleteProductionController
} = require('../controllers/production.controller');

const router = express.Router();

router.get('/production', getProduction);

router.get('/production/:id', getProductionByIdController);

router.post('/production', createProductionController);

router.put('/production/:id', updateProductionController);

router.delete('/production/:id', deleteProductionController);

module.exports = router;