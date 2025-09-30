// src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

const app = express();
const PORT = 3000;

// Necessário para usar __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessão (em memória - apenas para estudo!)
app.use(
  session({
    secret: "segredo-super-seguro",
    resave: false,
    saveUninitialized: false,
  })
);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// "Banco de dados" em memória
const users = [];
const tasks = [];

// ------------------- Rotas de Usuário -------------------
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Preencha usuário e senha" });
  }

  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  users.push({ username, password });
  res.json({ message: "Usuário registrado com sucesso!" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Usuário ou senha incorretos" });
  }

  req.session.user = user; // salva na sessão
  res.json({ message: "Login realizado com sucesso!" });
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout realizado com sucesso!" });
});

// Middleware para proteger rotas
function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Não autorizado. Faça login." });
  }
  next();
}

// ------------------- Rotas de Tarefas -------------------
app.get("/api/tasks", authMiddleware, (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", authMiddleware, (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Título é obrigatório" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
    owner: req.session.user.username,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

app.delete("/api/tasks/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// ------------------- Iniciar Servidor -------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
