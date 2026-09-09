const Database = require('better-sqlite3');

const db = new Database('radar.db');

console.log('SQLite conectado com sucesso');

module.exports = db;