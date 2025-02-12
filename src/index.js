require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const projectRoutes = require('./routes/routeProjects');
const taskRoutes = require('./routes/routeTasks');
const commentRoutes = require('./routes/commentRoutes');
const { join } = require("node:path");

const app = express();

// Настройка CORS с разрешением доступа с любого источника
const corsOptions = {
    origin: '*', // Разрешает доступ с любого источника
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
    credentials: true // Если необходимо передавать куки
};

app.use(cors(corsOptions)); // Используем настройки CORS
app.use(express.json());

connectDB();

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/comments', commentRoutes);
app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
