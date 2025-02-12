const Project = require('../models/modelProjects');
const Task = require('../models/modelTask');

exports.getAllProjects = async () => {
    try {
        return await Project.find().populate("tasks");
    } catch (err) {
        throw new Error('Ошибка при получении проектов');
    }
};

exports.createProject = async (projectData) => {
    try {
        const project = new Project(projectData);
        return await project.save();
    } catch (err) {
        throw new Error('Ошибка при создании проекта');
    }
};

exports.deleteProject = async (projectId) => {
    try {
        const tasksDeleted = await Task.deleteMany({ projectId });

        if (tasksDeleted.deletedCount === 0) {
            console.log("Задачи не найдены для удаления");
        }

        const projectDeleted = await Project.findByIdAndDelete(projectId);

        if (!projectDeleted) {
            throw new Error('Проект не найден');
        }

        return { message: 'Проект и все его задачи удалены' };
    } catch (err) {
        throw new Error('Ошибка при удалении проекта');
    }
};
