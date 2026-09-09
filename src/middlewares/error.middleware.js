const errorMiddleware = (error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    erro: 'Erro interno do servidor',
    caminho: req.originalUrl
  });
};

module.exports = errorMiddleware;