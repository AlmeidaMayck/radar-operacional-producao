const express = require('express');
const { getStatus } = require('../controllers/status.controller');

const router = express.Router();

router.get('/status', getStatus);

module.exports = router;