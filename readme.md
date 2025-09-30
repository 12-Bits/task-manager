# 📝 Task Manager

Um sistema de gerenciamento de tarefas desenvolvido como parte de um trabalho de curso, aplicando conceitos de **arquitetura web (REST + MVC)**, **boas práticas**, **autenticação básica** e **documentação de API com Swagger**.

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Bootstrap](https://getbootstrap.com/) (para interface visual)
- [SQLite](https://sqlite.org/)
- Git e Gitflow (para versionamento)

## 📌 Funcionalidades
- Cadastro de usuários (login/logout simples)
- CRUD de tarefas (Criar, Listar, Atualizar e Deletar)
- API documentada com **Swagger**
- Fluxo de versionamento com **Gitflow**
- Interface web básica com **HTML + CSS + Bootstrap**
- Deploy opcional em plataformas como **Render, Vercel ou Railway**

## 📂 Estrutura do Projeto
task-manager/ <br>
│── src/ <br>
│ ├── app.js # Ponto de entrada do servidor <br>
│ ├── routes/ # Rotas da API <br>
│ ├── controllers/ # Lógica de cada recurso <br>
│ ├── models/ # Modelos de dados <br>
│ ├── swagger.js # Configuração da documentação Swagger <br>
│── public/ # Arquivos estáticos (HTML, CSS, JS, Bootstrap) <br>
│── package.json <br>
│── README.md <br>


## ⚙️ Instalação e Execução

1. Clone o repositório:

   git clone https://github.com/seu-usuario/task-manager.git
   cd task-manager

2. Instale as dependências:

   npm install

3. Inicie o servidor:

   node src/app.js


## Autenticação

- O sistema possui login/logout básico.

- Apenas usuários autenticados podem criar, editar ou deletar tarefas.

## Endpoints da API

| Método | Rota         | Descrição              |
| ------ | ------------ | ---------------------- |
| GET    | `/tasks`     | Lista todas as tarefas |
| POST   | `/tasks`     | Cria uma nova tarefa   |
| PUT    | `/tasks/:id` | Atualiza uma tarefa    |
| DELETE | `/tasks/:id` | Remove uma tarefa      |
| POST   | `/login`     | Login básico           |
| GET    | `/logout`    | Logout                 |


## 🛠️ Planejamento

O desenvolvimento foi organizado com ferramentas como:

Trello ou Notion para Kanban e planejamento

Gitflow para versionamento:

main → versão estável

develop → desenvolvimento

feature/* → novas funcionalidades

hotfix/* → correções rápidas
