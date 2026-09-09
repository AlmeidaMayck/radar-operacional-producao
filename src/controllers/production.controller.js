const {
  getProductionData,
  getProductionById,
  createProduction,
  updateProduction,
  deleteProduction
} = require('../services/production.service');

const getProduction = (req, res) => {
  const production = getProductionData();

  res.json(production);
};

const getProductionByIdController = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      erro: 'ID deve ser um número inteiro positivo'
    });
  }

  const production = getProductionById(id);

  if (!production) {
    return res.status(404).json({
      erro: 'Produção não encontrada'
    });
  }

  res.json(production);
};

const createProductionController = (req, res) => {
  try {
    const production = createProduction(req.body);

    res.status(201).json(production);
  } catch (error) {
    res.status(400).json({
      erro: error.message
    });
  }
};

const updateProductionController = (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        erro: 'ID deve ser um número inteiro positivo'
      });
    }

    const production = updateProduction(id, req.body);

    if (!production) {
      return res.status(404).json({
        erro: 'Produção não encontrada'
      });
    }

    res.json(production);
  } catch (error) {
    res.status(400).json({
      erro: error.message
    });
  }
};

const deleteProductionController = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      erro: 'ID deve ser um número inteiro positivo'
    });
  }

  const production = deleteProduction(id);

  if (!production) {
    return res.status(404).json({
      erro: 'Produção não encontrada'
    });
  }

  res.json({
    mensagem: 'Produção excluída com sucesso',
    producao: production
  });
};

module.exports = {
  getProduction,
  getProductionByIdController,
  createProductionController,
  updateProductionController,
  deleteProductionController
};