const User = require("../models/users");
const { dataHandler } = require("../utils/responseHandler");
// const { generateRandomUser } = require("../utils/seed-generator");

module.exports.create = async function(req, res) {
  try {
    const response = await User.create(req.body);
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

module.exports.update = async function(req, res) {
  try {
    const { id } = req.body;
    const response = await User.findOneAndUpdate({
       _id: id 
    },
      req.body,
      { new: true }
    );
    
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

