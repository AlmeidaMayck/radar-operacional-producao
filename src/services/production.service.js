const db = require('../database/database');

const validateProductionData = (data) => {
  const { produto, quantidade, meta } = data;

  if (!produto) {
    throw new Error('Produto é obrigatório');
  }

  if (typeof produto !== 'string') {
    throw new Error('Produto deve ser um texto');
  }

  if (quantidade === undefined) {
    throw new Error('Quantidade é obrigatória');
  }

  if (typeof quantidade !== 'number' || !Number.isFinite(quantidade)) {
    throw new Error('Quantidade deve ser um número válido');
  }

  if (quantidade < 0) {
    throw new Error('Quantidade não pode ser negativa');
  }

  if (meta === undefined) {
    throw new Error('Meta é obrigatória');
  }

  if (typeof meta !== 'number' || !Number.isFinite(meta)) {
    throw new Error('Meta deve ser um número válido');
  }

  if (meta <= 0) {
    throw new Error('Meta deve ser maior que zero');
  }
};

const calculateProductionIndicators = (quantidade, meta) => {
  const percentualMeta = Number(((quantidade / meta) * 100).toFixed(2));

  let situacao;

  if (percentualMeta < 70) {
    situacao = 'critica';
  } else if (percentualMeta < 90) {
    situacao = 'atencao';
  } else {
    situacao = 'normal';
  }

  return {
    percentualMeta,
    situacao
  };
};



const getProductionData = () => {
  const productions = db
    .prepare('SELECT * FROM productions')
    .all();

  return productions.map((production) => {
    const indicators = calculateProductionIndicators(
    production.quantidade,
    production.meta
    );

    return {
    ...production,
    percentualMeta: indicators.percentualMeta,
    situacao: indicators.situacao
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

  const indicators = calculateProductionIndicators(
    production.quantidade,
    production.meta
    );

    return {
    ...production,
    percentualMeta: indicators.percentualMeta,
    situacao: indicators.situacao
    };
};

const createProduction = (production) => {
  validateProductionData(production);

  const indicators = calculateProductionIndicators(
    production.quantidade,
    production.meta
  );

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
    percentualMeta: indicators.percentualMeta,
    situacao: indicators.situacao
    };
};

const updateProduction = (id, production) => {
  validateProductionData(production);

  const existingProduction = db
    .prepare('SELECT * FROM productions WHERE id = ?')
    .get(id);

  if (!existingProduction) {
    return undefined;
  }

  const indicators = calculateProductionIndicators(
    production.quantidade,
    production.meta
  );

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
    percentualMeta: indicators.percentualMeta,
    situacao: indicators.situacao
  };
};

const deleteProduction = (id) => {
  const production = db
    .prepare('SELECT * FROM productions WHERE id = ?')
    .get(id);

  if (!production) {
    return undefined;
  }

  const deleteQuery = db.prepare(`
    DELETE FROM productions
    WHERE id = ?
  `);

  deleteQuery.run(id);

  const indicators = calculateProductionIndicators(
    production.quantidade,
    production.meta
    );

    return {
    ...production,
    percentualMeta: indicators.percentualMeta,
    situacao: indicators.situacao
    };
};

module.exports = {
  getProductionData,
  getProductionById,
  createProduction,
  updateProduction,
  deleteProduction
};