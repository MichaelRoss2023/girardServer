const express = require('express');
const { createLesson, getLesson, updateLesson, deleteLesson } = require('../controllers/lessons');
const router = require('express').Router();

router.route('/').get(getLesson).post(createLesson);
router.route('/:id').delete(deleteLesson).put(updateLesson);

module.exports = router;