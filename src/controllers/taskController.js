import db from '../database.js';

export const getTasksByUser = (req, res) => {
  const { userId } = req.params; // Pega o ID do usuário da URL
  const sql = `SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC`;
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ tasks: rows });
  });
};

export const createTask = (req, res) => {
  const { title, description, userId } = req.body;
  if (!title || !userId) {
    return res.status(400).json({ error: 'Título e ID do usuário são obrigatórios.' });
  }
  const sql = `INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)`;
  db.run(sql, [title, description, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Tarefa criada com sucesso!', taskId: this.lastID });
  });
};

export const updateTask = (req, res) => {
  const { taskId } = req.params;
  const { title, description, is_completed } = req.body;

  const fields = [];
  const params = [];
  if(title) { fields.push('title = ?'); params.push(title); }
  if(description) { fields.push('description = ?'); params.push(description); }
  if(is_completed !== undefined) { fields.push('is_completed = ?'); params.push(is_completed); }
  
  if (fields.length === 0) {
    return res.status(400).json({ error: 'Nenhum campo para atualizar.' });
  }

  params.push(taskId);
  const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Tarefa atualizada com sucesso!' });
  });
};

export const deleteTask = (req, res) => {
  const { taskId } = req.params;
  const sql = `DELETE FROM tasks WHERE id = ?`;
  db.run(sql, [taskId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Tarefa deletada com sucesso!' });
  });
};