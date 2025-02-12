const projectService = require('../services/projectService');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const projectData = { ...req.body };
        delete projectData._id;
        const project = await projectService.createProject(projectData);
        res.status(201).json(project);
    } catch (err) {
        console.error("Ошибка при создании проекта:", err);
        res.status(500).json({ error: "Ошибка при создании проекта", details: err.message });
    }
};


exports.deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const result = await projectService.deleteProject(projectId);
        res.json(result); // Возвращаем сообщение об успешном удалении
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
