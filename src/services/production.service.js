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
  const production = productions.find(
    (production) => production.id === id
  );

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

  const newProduction = {
    id: productions.length + 1,
    ...production,
    percentualMeta: percentual,
    situacao: getProductionSituation(percentual)
  };

  productions.push(newProduction);

  return newProduction;
};

const updateProduction = (id, production) => {
  const index = productions.findIndex(
    (production) => production.id === id
  );

  if (index === -1) {
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

  const updatedProduction = {
    id,
    ...production,
    percentualMeta: percentual,
    situacao: getProductionSituation(percentual)
  };

  productions[index] = updatedProduction;

  return updatedProduction;
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