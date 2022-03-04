const express = require('express');
const { createLesson } = require('../controllers/lessons');
const lessonRouter = express.Router();

lessonRouter.route('/')
.post(createLesson)

module.exports = lessonRouter;