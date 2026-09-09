const express = require('express');
const cors = require('cors');

const statusRoutes = require('./routes/status.routes');
const productionRoutes = require('./routes/production.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(cors());

app.use(express.json());
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.json({ message: 'Radar Operacional de Produção API' });
});

app.use('/api', statusRoutes);
app.use('/api', productionRoutes);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl
  });
});

app.use(errorMiddleware);

module.exports = app;