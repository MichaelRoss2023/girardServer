const { 

  createPositions, 
  getAllPositions, 

  getAllPositionsBySkillsAndRequirement
} = require('../controllers/skills');


const express = require('express');

const positionRouter = express.Router();

positionRouter.post('/getBySkills', getAllPositionsBySkillsAndRequirement);

positionRouter.route('/')
.get(getAllPositions)
.post(createPositions);

module.exports = positionRouter;