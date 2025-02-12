const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Связь с задачами
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
