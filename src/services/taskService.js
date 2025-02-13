const Task = require("../models/modelTask");
const Project = require("../models/modelProjects");
const iconv = require('iconv-lite');
const mongoose = require("mongoose");

exports.addFilesToTask = async (taskId, files) => {
    console.log("Пришли файлы для добавления к задаче:", files); // Проверяем файлы

    if (!files || files.length === 0) {
        throw new Error("Нет файлов для загрузки");
    }

    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error("Задача не найдена");
    }

    const fileData = files.map((file) => {
        console.log("Файл для добавления:", file);
        return {
            fileName: file.originalname,
            url: file.path,
        };
    });

    task.files.push(...fileData);
    console.log("Файлы добавлены в массив задачи:", task.files);

    await task.save();
    console.log("Задача сохранена в базе данных");

    return task;
};


exports.deleteFileFromTask = async (taskId, fileId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error("Задача не найдена");
    }

    const initialLength = task.files.length;
    task.files = task.files.filter(file => file._id.toString() !== fileId);

    if (task.files.length === initialLength) {
        throw new Error("Файл не найден");
    }

    await task.save();

    return task.files;
};

exports.getTasksByProject = async (projectId) => {
    const tasks = await Task.find({ projectId });
    return tasks;
};

exports.createTask = async (projectId, title, description, priority) => {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Неверный формат projectId");
    }

    const projectObjectId = new mongoose.Types.ObjectId(projectId);
    const project = await Project.findById(projectObjectId);
    if (!project) {
        throw new Error("Проект не найден");
    }

    const task = new Task({
        projectId: projectObjectId,
        title,
        description,
        priority: priority || "Low"
    });

    await task.save();
    await Project.findByIdAndUpdate(projectObjectId, { $push: { tasks: task._id } });

    return task;
};

exports.updateTask = async (taskId, title, description, status, priority) => {
    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, status, priority },
        { new: true }
    );

    if (!updatedTask) {
        throw new Error("Задача не найдена");
    }

    return updatedTask;
};

exports.updateSubtaskStatus = async (taskId, subtaskId, status) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error("Задача не найдена");
    }

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) {
        throw new Error("Подзадача не найдена");
    }

    subtask.status = status;
    subtask.completedAt = status === "Completed" ? Date.now() : null;

    await task.save();
    return subtask;
};

exports.deleteTask = async (taskId, projectId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error("Задача не найдена перед удалением");
    }

    await Project.findByIdAndUpdate(projectId, { $pull: { tasks: taskId } });
    const deletedTask = await Task.findByIdAndDelete(taskId);

    return deletedTask;
};

exports.deleteSubtask = async (taskId, subtaskId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error("Задача не найдена");
    }

    const initialLength = task.subtasks.length;
    task.subtasks = task.subtasks.filter((sub) => sub._id.toString() !== subtaskId);

    if (task.subtasks.length === initialLength) {
        throw new Error("Подзадача не найдена");
    }

    await task.save();

    return "Подзадача удалена";
};

exports.createSubtask = async (taskId, title, status, description, dueDate) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error("Задача не найдена");
    }

    const subtask = {
        title,
        taskId,
        status: status || "Queue",
        description: description || "",
        dueDate: dueDate || null,
    };

    task.subtasks.push(subtask);
    await task.save();

    return task;
};

exports.reorderTasks = async (reorderedTasks) => {
    for (const task of reorderedTasks) {
        if (!["Queue", "Development", "Done"].includes(task.status)) {
            throw new Error(`Некорректный статус задачи с id: ${task.id}`);
        }
    }

    const bulkOps = reorderedTasks.map((task) => ({
        updateOne: {
            filter: { _id: task.id },
            update: { order: task.order, status: task.status },
        },
    }));

    await Task.bulkWrite(bulkOps);

    return "Порядок задач обновлен";
};
