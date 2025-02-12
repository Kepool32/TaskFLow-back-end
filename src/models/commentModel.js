const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },  // Связь с задачей
        text: { type: String, required: true },  // Текст комментария
        parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },  // Родительский комментарий (null если нет родителя)
        createdAt: { type: Date, default: Date.now },  // Время создания комментария
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
