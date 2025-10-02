import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Registra um novo usuário
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserCredentials'
 * responses:
 * '201':
 * description: Usuário registrado com sucesso
 * '400':
 * description: Erro na requisição (dados faltantes ou usuário já existe)
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Realiza o login de um usuário
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UserCredentials'
 * responses:
 * '200':
 * description: Login bem-sucedido
 * '401':
 * description: Credenciais inválidas
 */
router.post('/login', login);

export default router;