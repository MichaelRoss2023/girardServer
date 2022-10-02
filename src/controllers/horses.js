const asyncHandler = require('express-async-handler');
const Horse = require("../models/horses");
const { dataHandler } = require("../utils/responseHandler");

module.exports.createHorses = asyncHandler(async function(req, res) {
    const response = await Horse.insertMany(req.body);
    res.status(201).json(response);
});

module.exports.getHorses = asyncHandler(async function(req, res) {
    const response = await Horse.find({});
    res.status(200).json(response);
});

module.exports.updateHorses = asyncHandler(async function(req, res) {
    const id = await Horse.findById(req.params.id)

    if (!id)
    {
      res.status(400);
      throw new Error("Horse not found")
    }

    const response = await Horse.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(response);
});

module.exports.deleteHorses = asyncHandler(async function(req, res) {
    const id = await Horse.findById(req.params.id);

    if (!id)
    {
        res.status(400);
        throw new Error("Horse not found");
    }

    // no need to save response since we are deleting
    await id.delete();
    res.status(200).json({ id: req.params.id });
});