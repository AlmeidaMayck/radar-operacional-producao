const getStatus = (req, res) => {
  res.json({
    status: 'online',
    sistema: 'Radar Operacional de Produção'
  });
};

module.exports = {
  getStatus
};