import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "..", "public")));


//Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});