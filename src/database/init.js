const db = require('./database');

db.exec(`
  CREATE TABLE IF NOT EXISTS productions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto TEXT NOT NULL,
    quantidade REAL NOT NULL,
    meta REAL NOT NULL,
    status TEXT NOT NULL
  )
`);

console.log('Tabela productions criada/verificada com sucesso');