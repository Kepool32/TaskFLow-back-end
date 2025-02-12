const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        status: {
            type: String,
            enum: ["Queue", "Development", "Done"],
            default: "Queue"
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Low"
        },
        createdAt: { type: Date, default: Date.now },
        dueDate: {
            type: Date,
            validate: { validator: (v) => v >= Date.now(), message: 'Due date must be in the future' }
        },
        files: {
            type: [{
                fileName: String,
                url: String
            }],
            default: []
        },
        subtasks: {
            type: [{
                title: { type: String, required: true },
                taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
                status: {
                    type: String,
                    enum: ["Queue", "In Progress", "Completed"],
                    default: "Queue"
                },
                completedAt: { type: Date, default: null },
            }],
            default: []
        },
        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        remainingTime: {
            type: Number,
            default: function() {
                if (this.dueDate) {
                    return Math.max((this.dueDate - Date.now()) / (1000 * 60 * 60 * 24), 0); // оставшееся время в днях
                }
                return 0;
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
