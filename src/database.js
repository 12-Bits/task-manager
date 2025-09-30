import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(path.join(__dirname, '..', 'database.db'), (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT 0,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`);
  }
});

export default db;