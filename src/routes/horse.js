const { createHorses } = require('../controllers/horses');

const express = require('express');
const horseRouter = express.Router();

horseRouter.route('/horses')
.post(createHorses)

module.exports = horseRouter;