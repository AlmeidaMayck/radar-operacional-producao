const db = require('../database/database');

const productions = [
  {
    id: 1,
    produto: 'Produto A',
    quantidade: 850,
    meta: 1000,
    status: 'em_producao'
  },
  {
    id: 2,
    produto: 'Produto B',
    quantidade: 1200,
    meta: 1200,
    status: 'concluido'
  }
];

const getProductionSituation = (percentualMeta) => {
  if (percentualMeta < 70) {
    return 'critica';
  }

  if (percentualMeta < 90) {
    return 'atencao';
  }

  return 'normal';
};

const getProductionData = () => {
  const productions = db
    .prepare('SELECT * FROM productions')
    .all();

  return productions.map((production) => {
    const percentualMeta =
      (production.quantidade / production.meta) * 100;

    const percentual = Number(percentualMeta.toFixed(2));

    return {
      ...production,
      percentualMeta: percentual,
      situacao: getProductionSituation(percentual)
    };
  });
};

const getProductionById = (id) => {
  const production = db
    .prepare('SELECT * FROM productions WHERE id = ?')
    .get(id);

  if (!production) {
    return undefined;
  }

  const percentualMeta =
    (production.quantidade / production.meta) * 100;

  const percentual = Number(percentualMeta.toFixed(2));

  return {
    ...production,
    percentualMeta: percentual,
    situacao: getProductionSituation(percentual)
  };
};

const createProduction = (production) => {
  if (!production.produto) {
    throw new Error('O produto é obrigatório');
  }

  if (typeof production.produto !== 'string') {
    throw new Error('O produto deve ser um texto');
  }

  if (production.quantidade === undefined) {
    throw new Error('A quantidade é obrigatória');
  }

  if (typeof production.quantidade !== 'number') {
    throw new Error('A quantidade deve ser um número');
  }

  if (!Number.isFinite(production.quantidade)) {
    throw new Error('A quantidade deve ser um número válido');
  }

  if (production.meta === undefined) {
    throw new Error('A meta é obrigatória');
  }

  if (typeof production.meta !== 'number') {
    throw new Error('A meta deve ser um número');
  }

  if (!Number.isFinite(production.meta)) {
    throw new Error('A meta deve ser um número válido');
  }

  if (production.quantidade < 0) {
    throw new Error('A quantidade não pode ser negativa');
  }

  if (production.meta <= 0) {
    throw new Error('A meta deve ser maior que zero');
  }

  const percentualMeta =
  (production.quantidade / production.meta) * 100;

    const percentual = Number(percentualMeta.toFixed(2));

    const insert = db.prepare(`
    INSERT INTO productions (
        produto,
        quantidade,
        meta,
        status
    )
    VALUES (?, ?, ?, ?)
    `);

    const result = insert.run(
    production.produto,
    production.quantidade,
    production.meta,
    production.status
    );

    return {
    id: result.lastInsertRowid,
    produto: production.produto,
    quantidade: production.quantidade,
    meta: production.meta,
    status: production.status,
    percentualMeta: percentual,
    situacao: getProductionSituation(percentual)
    };
};

const updateProduction = (id, production) => {
  const existingProduction = db
  .prepare('SELECT * FROM productions WHERE id = ?')
  .get(id);

  if (!existingProduction) {
    return undefined;
  }

  if (!production.produto) {
    throw new Error('O produto é obrigatório');
  }

  if (typeof production.produto !== 'string') {
    throw new Error('O produto deve ser um texto');
  }

  if (production.quantidade === undefined) {
    throw new Error('A quantidade é obrigatória');
  }

  if (typeof production.quantidade !== 'number') {
    throw new Error('A quantidade deve ser um número');
  }

  if (!Number.isFinite(production.quantidade)) {
    throw new Error('A quantidade deve ser um número válido');
  }

  if (production.meta === undefined) {
    throw new Error('A meta é obrigatória');
  }

  if (typeof production.meta !== 'number') {
    throw new Error('A meta deve ser um número');
  }

  if (!Number.isFinite(production.meta)) {
    throw new Error('A meta deve ser um número válido');
  }

  if (production.quantidade < 0) {
    throw new Error('A quantidade não pode ser negativa');
  }

  if (production.meta <= 0) {
    throw new Error('A meta deve ser maior que zero');
  }

  const percentualMeta =
    (production.quantidade / production.meta) * 100;

  const percentual = Number(percentualMeta.toFixed(2));

  const update = db.prepare(`
    UPDATE productions
    SET
        produto = ?,
        quantidade = ?,
        meta = ?,
        status = ?
    WHERE id = ?
   `);

    update.run(
    production.produto,
    production.quantidade,
    production.meta,
    production.status,
    id
    );

    return {
    id,
    produto: production.produto,
    quantidade: production.quantidade,
    meta: production.meta,
    status: production.status,
    percentualMeta: percentual,
    situacao: getProductionSituation(percentual)
    };
};

const deleteProduction = (id) => {
  const index = productions.findIndex(
    (production) => production.id === id
  );

  if (index === -1) {
    return undefined;
  }

  const deletedProduction = productions[index];

  productions.splice(index, 1);

  return deletedProduction;
};

module.exports = {
  getProductionData,
  getProductionById,
  createProduction,
  updateProduction,
  deleteProduction
};