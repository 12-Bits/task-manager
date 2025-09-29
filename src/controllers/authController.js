const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  async register(req, res) {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ username, password: hashed });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: 'Usuário já existe' });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Senha inválida' });

    req.session.userId = user.id;
    res.json({ message: 'Login realizado com sucesso' });
  },

  logout(req, res) {
    req.session.destroy();
    res.json({ message: 'Logout realizado com sucesso' });
  }
};
