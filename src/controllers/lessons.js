const Lesson = require("../models/lessons");
const { getFormattedDateTime, convertTimeFormat } = require("../utils/helper");
const { dataHandler } = require("../utils/responseHandler");
const { sendLessonMail } = require("./../utils/emailer");
const asyncHandler = require('express-async-handler');

module.exports.createLesson = asyncHandler(async function(req, res) {
    const response = await Lesson.insertMany(req.body);
    res.status(200).json(response);
    
    sendLessonMail({
      userEmail: '@gmail.com',
      name: 'Aaron'
    });
});

module.exports.getLesson = asyncHandler(async function(req, res) {
  const response = await Lesson.find({});
  res.status(200).json(response);
  sendLessonMail({
    userEmail: '@gmail.com',
    name: 'Aaron'
  });
});

module.exports.updateLesson = asyncHandler(async function(req, res) {
  const id = await Lesson.findById(req.params.id)

  if (!id) {
    res.status(400);
    throw new Error("Lesson not found")
  }

  const response = await Lesson.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(response);
});

module.exports.deleteLesson = asyncHandler(async function(req, res) {
  const id = await Lesson.findById(req.params.id);

  if (!id) {
      res.status(400);
      throw new Error("Lesson not found");
  }
  
  await id.delete();
  res.status(200).json({ id: req.params.id });
});