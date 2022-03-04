const Lesson = require("../models/lessons");
const { getFormattedDateTime, convertTimeFormat } = require("../utils/helper");
const { dataHandler } = require("../utils/responseHandler");
const { sendLessonMail } = require("./../utils/emailer");

module.exports.createLesson = async function(req, res) {
  try {
    const lessonData = req.body;

    lessonData.startTime = convertTimeFormat(lessonData.startTime, 'hh:mm');
    lessonData.endTime = convertTimeFormat(lessonData.endTime, 'hh:mm');
    lessonData.bookedDates = [new Date()];

    const response = await Lesson.create(lessonData);
    
    sendLessonMail({
      userEmail: 'developer.akash.s@gmail.com',
      name: 'Amy'
    });
  
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
