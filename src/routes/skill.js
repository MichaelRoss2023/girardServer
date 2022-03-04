const { 
  createSkills, 
  getAllSkills, 
} = require('../controllers/skills');

const express = require('express');

const skillRouter = express.Router();

// skillRouter.get('/skills/')

skillRouter.route('/')
.get(getAllSkills)
.post(createSkills);

module.exports = skillRouter;