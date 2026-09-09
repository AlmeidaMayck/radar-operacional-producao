const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.resolve(__dirname, '../../radar.db'));

console.log('SQLite conectado com sucesso');

module.exports = db;