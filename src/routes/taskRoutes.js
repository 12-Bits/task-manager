const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const tasksFile = path.join(__dirname, "..", "tasks.json");

// 🔹 Funções auxiliares
function loadTasks() {
  if (!fs.existsSync(tasksFile)) return [];
  return JSON.parse(fs.readFileSync(tasksFile));
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Middleware para verificar login
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  next();
}

// 🔹 Listar tarefas do usuário logado
router.get("/", requireLogin, (req, res) => {
  const tasks = loadTasks();
  const userTasks = tasks.filter(t => t.username === req.session.user.username);
  res.json(userTasks);
});

// 🔹 Criar nova tarefa
router.post("/", requireLogin, (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ message: "Descrição obrigatória" });
  }

  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    username: req.session.user.username,
    description
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
});

// 🔹 Excluir tarefa
router.delete("/:id", requireLogin, (req, res) => {
  const id = parseInt(req.params.id);
  let tasks = loadTasks();

  const task = tasks.find(t => t.id === id && t.username === req.session.user.username);
  if (!task) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);

  res.json({ message: "Tarefa excluída com sucesso" });
});

module.exports = router;
