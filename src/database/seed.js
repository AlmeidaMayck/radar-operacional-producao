const db = require('./database');

const insert = db.prepare(`
  INSERT INTO productions (
    produto,
    quantidade,
    meta,
    status
  )
  VALUES (?, ?, ?, ?)
`);

const productions = [
  {
    produto: 'Produto A',
    quantidade: 850,
    meta: 1000,
    status: 'em_producao'
  },
  {
    produto: 'Produto B',
    quantidade: 1200,
    meta: 1200,
    status: 'concluido'
  }
];

const insertMany = db.transaction((productions) => {
  for (const production of productions) {
    insert.run(
      production.produto,
      production.quantidade,
      production.meta,
      production.status
    );
  }
});

insertMany(productions);

console.log('Dados inseridos com sucesso no SQLite');