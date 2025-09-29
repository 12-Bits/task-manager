const Task = require('../models/Task');

module.exports = {
  async list(req, res) {
    const tasks = await Task.findAll({ where: { UserId: req.session.userId } });
    res.json(tasks);
  },

  async create(req, res) {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, UserId: req.session.userId });
    res.json(task);
  },

  async update(req, res) {
    const { id } = req.params;
    const { title, description, status } = req.body;
    await Task.update({ title, description, status }, { where: { id, UserId: req.session.userId } });
    res.json({ message: 'Tarefa atualizada' });
  },

  async remove(req, res) {
    const { id } = req.params;
    await Task.destroy({ where: { id, UserId: req.session.userId } });
    res.json({ message: 'Tarefa removida' });
  }
};
