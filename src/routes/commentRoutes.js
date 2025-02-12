const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


router.get('/:taskId', commentController.getCommentsByTask);

router.post('/:taskId', commentController.createComment);

module.exports = router;
