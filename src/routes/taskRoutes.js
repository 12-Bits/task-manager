const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, taskController.list);
router.post('/', authMiddleware, taskController.create);
router.put('/:id', authMiddleware, taskController.update);
router.delete('/:id', authMiddleware, taskController.remove);

module.exports = router;
