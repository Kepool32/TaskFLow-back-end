require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const projectRoutes = require('./routes/routeProjects');
const taskRoutes = require('./routes/routeTasks');
const commentRoutes = require('./routes/commentRoutes');
const {join} = require("node:path");

const app = express();


app.use(cors());
app.use(express.json());

connectDB();

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/comments', commentRoutes);
app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
