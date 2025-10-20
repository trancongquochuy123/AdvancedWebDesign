const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'db_banhang.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ Lỗi kết nối SQLite:', err.message);
  else console.log('✅ Kết nối SQLite thành công');
});

module.exports = db;
