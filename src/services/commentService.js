const Comment = require('../models/commentModel');

exports.getCommentsByTask = async (taskId) => {
    try {
        const comments = await Comment.find({ taskId });
        return buildCommentTree(comments);
    } catch (err) {
        throw new Error('Error fetching comments');
    }
};

exports.createComment = async (taskId, text, parentCommentId) => {
    try {

        if (parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId);
            if (!parentComment) {
                throw new Error("Родительский комментарий не найден");
            }
        }

        const newComment = new Comment({ taskId, text, parentCommentId });
        const savedComment = await newComment.save();

        const comments = await Comment.find({ taskId });
        return buildCommentTree(comments);
    } catch (err) {
        throw new Error('Ошибка при создании комментария');
    }
};

function buildCommentTree(comments) {
    const map = {};
    const roots = [];

    comments.forEach(comment => {
        map[comment._id] = { ...comment.toObject(), children: [] };
    });

    comments.forEach(comment => {
        if (comment.parentCommentId) {
            map[comment.parentCommentId].children.push(map[comment._id]);
        } else {
            roots.push(map[comment._id]);
        }
    });

    return roots;
}
