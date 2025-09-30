import express from 'express';
import { getTasksByUser, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/user/:userId', getTasksByUser);

router.post('/', createTask);

router.put('/:taskId', updateTask);

router.delete('/:taskId', deleteTask);

export default router;