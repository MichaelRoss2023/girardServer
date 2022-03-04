const Position = require("../models/positions");
const Horse = require("../models/horses");
const { dataHandler } = require("../utils/responseHandler");

module.exports.createHorses = async function(req, res) {
  try {
    const response = await Horse.insertMany(req.body);
    return dataHandler({
        status: 201,
        data: response,
      },
      res
    );
  } catch (err) {
    return dataHandler(
      {
        status: 500,
        error: `Server error: ${err.message}.`
      },
      res
    );
  }
};

module.exports.getAllSkills = async function(req, res) {
  try {
    const response = await Skill.find({});
    
    return dataHandler({
        status: 200,
        data: response,
      },
      res
    );
  } catch (err) {
    return dataHandler(
      {
        status: 500,
        error: `Server error: ${err.message}.`
      },
      res
    );
  }
};
