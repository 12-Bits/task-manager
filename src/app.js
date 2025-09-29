// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Necessário para usar __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares para interpretar o body
app.use(express.json()); // Para JSON (fetch com JSON.stringify)
app.use(express.urlencoded({ extended: true })); // Para forms

// Servir arquivos estáticos (HTML, CSS, JS do front)
app.use(express.static(path.join(__dirname, "public")));

// Simulação de "banco de dados" em memória
const users = [];

// Rota de registro
app.post("/register", (req, res) => {
  console.log("req.body:", req.body);

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Preencha usuário e senha" });
  }

  // Verificar se já existe
  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  // Salvar usuário
  users.push({ username, password });
  console.log("Usuários registrados:", users);

  res.json({ message: "Usuário registrado com sucesso!" });
});

// Rota de login
app.post("/login", (req, res) => {
  console.log("req.body:", req.body);

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Preencha usuário e senha" });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Usuário ou senha incorretos" });
  }

  res.json({ message: "Login realizado com sucesso!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
