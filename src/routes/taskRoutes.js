import express from 'express';
import { getTasksByUser, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

/**
 * @swagger
 * /api/tasks/user/{userId}:
 * get:
 * summary: Busca todas as tarefas de um usuário
 * tags: [Tarefas]
 * parameters:
 * - in: path
 * name: userId
 * required: true
 * description: O ID do usuário para buscar as tarefas
 * schema:
 * type: integer
 * responses:
 * '200':
 * description: Uma lista de tarefas do usuário
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Task'
 */
router.get('/user/:userId', getTasksByUser);

/**
 * @swagger
 * /api/tasks:
 * post:
 * summary: Cria uma nova tarefa
 * tags: [Tarefas]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * description:
 * type: string
 * userId:
 * type: integer
 * required:
 * - title
 * - userId
 * responses:
 * '201':
 * description: Tarefa criada com sucesso
 */
router.post('/', createTask);

/**
 * @swagger
 * /api/tasks/{taskId}:
 * put:
 * summary: Atualiza uma tarefa existente
 * tags: [Tarefas]
 * parameters:
 * - in: path
 * name: taskId
 * required: true
 * description: O ID da tarefa a ser atualizada
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * description:
 * type: string
 * is_completed:
 * type: integer
 * responses:
 * '200':
 * description: Tarefa atualizada com sucesso
 */
router.put('/:taskId', updateTask);

/**
 * @swagger
 * /api/tasks/{taskId}:
 * delete:
 * summary: Deleta uma tarefa
 * tags: [Tarefas]
 * parameters:
 * - in: path
 * name: taskId
 * required: true
 * description: O ID da tarefa a ser deletada
 * schema:
 * type: integer
 * responses:
 * '200':
 * description: Tarefa deletada com sucesso
 */
router.delete('/:taskId', deleteTask);

export default router;