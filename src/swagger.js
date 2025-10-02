// src/swagger.js

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Minha API de Tarefas',
    version: '1.0.0',
    description: 'Documentação da API para gerenciar autenticação e tarefas.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  // 1. ADICIONE AS TAGS GLOBAIS AQUI
  tags: [
    {
      name: 'Autenticação',
      description: 'Endpoints para registro e login de usuários',
    },
    {
      name: 'Tarefas',
      description: 'API para gerenciamento de tarefas',
    },
  ],
  // 2. ADICIONE TODOS OS SCHEMAS GLOBAIS AQUI
  components: {
    schemas: {
      // Schemas de Autenticação
      UserCredentials: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
        example: {
          username: "johndoe",
          password: "password123",
        },
      },
      // Schemas de Tarefas
      Task: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          description: { type: 'string' },
          is_completed: { type: 'integer', description: '0 = pendente, 1 = concluída' },
          user_id: { type: 'integer' },
        },
        example: {
            id: 1,
            title: "Comprar leite",
            description: "Ir ao mercado.",
            is_completed: 0,
            user_id: 5,
        },
      },
    },
    // Componente de segurança (opcional, mas recomendado)
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;