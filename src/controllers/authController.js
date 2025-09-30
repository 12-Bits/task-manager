import bcrypt from 'bcryptjs';
import db from '../database.js';

export const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Preencha usuário e senha" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(sql, [username, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ error: "Usuário já existe ou erro ao registrar." });
    }
    res.status(201).json({ message: "Usuário registrado com sucesso!", userId: this.lastID });
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Preencha usuário e senha" });
  }

  const sql = `SELECT * FROM users WHERE username = ?`;
  db.get(sql, [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Usuário ou senha incorretos" });
    }
    
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Usuário ou senha incorretos" });
    }
    else{
      const userId = user.id;
      res.json({ message: "Login realizado com sucesso!",
      userId: userId //ID do Usuário
      });
    }
  });
};