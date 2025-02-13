const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
    addFilesToTask,
    deleteFileFromTask,
    getTasksByProject,
    createTask,
    updateTask,
    updateSubtaskStatus,
    deleteSubtask,
    deleteTask,
    createSubtask,
    reorderTasks
} = require("../services/taskService");


const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

exports.uploadFiles = (req, res, next) => {
    upload.array("files", 10)(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log("Файлы загружены:", req.files);
        next();
    });
};

exports.addFilesToTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const files = req.files;
        const task = await addFilesToTask(taskId, files);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteFileFromTask = async (req, res) => {
    try {
        const { taskId, fileId } = req.params;
        const files = await deleteFileFromTask(taskId, fileId);
        res.json({ message: "File deleted", files });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await getTasksByProject(projectId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, priority } = req.body;
        const task = await createTask(projectId, title, description, priority);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, status, priority } = req.body;
        const updatedTask = await updateTask(taskId, title, description, status, priority);
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSubtaskStatus = async (req, res) => {
    try {
        const { taskId, subtaskId } = req.params;
        const { status } = req.body;
        const subtask = await updateSubtaskStatus(taskId, subtaskId, status);
        res.json(subtask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { projectId } = req.query;
        const deletedTask = await deleteTask(taskId, projectId);
        res.json({ message: "Task deleted", deletedTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSubtask = async (req, res) => {
    try {
        const { taskId, subtaskId } = req.params;
        const message = await deleteSubtask(taskId, subtaskId);
        res.json({ message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSubtask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, status, description, dueDate } = req.body;
        const task = await createSubtask(taskId, title, status, description, dueDate);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.reorderTasks = async (req, res) => {
    try {
        const reorderedTasks = req.body;
        await reorderTasks(reorderedTasks);
        res.json({ message: "Tasks reordered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
