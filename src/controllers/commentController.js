const commentService = require('../services/commentService');

exports.getCommentsByTask = async (req, res) => {
    try {
        const nestedComments = await commentService.getCommentsByTask(req.params.taskId);
        res.json(nestedComments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { text, parentCommentId } = req.body;
        const nestedComments = await commentService.createComment(
            req.params.taskId,
            text,
            parentCommentId
        );
        res.status(201).json(nestedComments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
