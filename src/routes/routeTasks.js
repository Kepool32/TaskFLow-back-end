const express = require("express");
const router = express.Router();
const {
    getTasksByProject,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks,
    createSubtask,
    updateSubtaskStatus,
    deleteSubtask,
    addFilesToTask,
    uploadFiles, // this middleware is used for file uploads
    deleteFileFromTask
} = require("../controllers/taskController");

// Get tasks by project ID
router.get("/:projectId", getTasksByProject);

// Create a new task for a specific project
router.post("/:projectId", createTask);

// Update an existing task
router.patch("/:taskId", updateTask);

// Reorder tasks based on new order
router.patch("/reorder", reorderTasks);

// Delete a task by ID
router.delete("/:taskId", deleteTask);

// Create a new subtask for a task
router.post("/:taskId/subtask", createSubtask);

// Update the status of a subtask
router.patch("/:taskId/subtask/:subtaskId", updateSubtaskStatus);

// Delete a subtask from a task
router.delete("/:taskId/subtask/:subtaskId", deleteSubtask);

// Delete a file from a task
router.delete("/:taskId/file/:fileId", deleteFileFromTask);

// Handle file uploads for a task
// First, the `uploadFiles` middleware is called to handle file uploads,
// then `addFilesToTask` will process the uploaded files.
router.post("/:taskId/files", uploadFiles, addFilesToTask);

module.exports = router;
