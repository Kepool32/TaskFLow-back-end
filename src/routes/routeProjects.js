const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllProjects);


router.post('/', projectController.createProject);


router.delete('/:projectId', projectController.deleteProject);

module.exports = router;
