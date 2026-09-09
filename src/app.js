const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Radar Operacional de Produção API' });
});

module.exports = app;