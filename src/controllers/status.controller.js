const { getSystemStatus } = require('../services/status.service');

const getStatus = (req, res) => {
  const status = getSystemStatus();

  res.json(status);
};

module.exports = {
  getStatus
};