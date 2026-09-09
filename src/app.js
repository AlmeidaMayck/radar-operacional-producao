const express = require('express');

const statusRoutes = require('./routes/status.routes');
const productionRoutes = require('./routes/production.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Radar Operacional de Produção API' });
});

app.use('/api', statusRoutes);
app.use('/api', productionRoutes);

module.exports = app;