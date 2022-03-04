const Position = require("../models/positions");
const Skill = require("../models/skills");
const Lesson = require('../models/lessons');
const { dataHandler } = require("../utils/responseHandler");
const mongoose = require("../models/db/connector");
const { 
  getFormattedDateTime, 
  getLastDateOf, 
  isDateInGivenMonthRange, 
  getDatesForMonth 
} = require("../utils/helper");

const VOLUNTEER_POSITIONS = {
  "barn crew": '5fba6ae419a5ebce8b83ea3a',
  "lesson assistant": '5fba6ae419a5ebce8b83ea3d',
  "horse leader": '5fba6ae419a5ebce8b83ea3c',
  "sidewalker": '5fba6ae419a5ebce8b83ea3b',
}

module.exports.createSkills = async function(req, res) {
  try {
    const response = await Skill.insertMany(req.body);
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

module.exports.getAllPositions = async function(req, res) {
  try {
    const response = await Position.find({});

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

module.exports.createPositions = async function(req, res) {
  try {
    const response = await Position.insertMany(req.body);
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

module.exports.getAllPositionsBySkillsAndRequirement = async function(req, res) {
  try {
    const { 
      skillsListToCheck, 
      requestedMonth,
      requestedYear
     } = req.body;

    const positionGoodToVol = [];

    let start = new Date();
    let end;

    if(requestedMonth && requestedYear) {
      start = new Date(`${requestedYear}-${requestedMonth - 1}-01`);
    }

    const _requestedMonth = requestedMonth || (start.getMonth() + 1);
    const _requestedYear = requestedYear || start.getFullYear();

    end = getLastDateOf(_requestedMonth, _requestedYear);
    
    const allVolPositions = await Position.find({});

    for (let pos of allVolPositions) {
      console.log(`checking for ${pos['name']} with ${pos["skills"]}`);

      const isAllSkillsMatched = (
        pos["skills"]
        .filter(value => 
          skillsListToCheck.includes(value.toString())
        ).length == pos["skills"].length
      ) ? true: false;

      if(isAllSkillsMatched) {
        positionGoodToVol.push(pos["name"]);
      }
    }

    //find lessons in said date range
    const lessonsInMonth = await Lesson.find({
      'bookedDates': {
        $gte: start,
        $lt: end
      }}
    );

    const displayRequiredPositions = getDatesForMonth(_requestedMonth, _requestedYear);


    //n lesson
    for (let lesson of lessonsInMonth) {

      const inThisMonth = lesson.bookedDates.filter(dt => isDateInGivenMonthRange(dt, (_requestedMonth - 1), _requestedYear));
      
      const lessonVol = JSON.parse(JSON.stringify(lesson.volunteers));
      //max 4 itrn
      for (const volPosition in lessonVol) {

        if((((lessonVol[volPosition].required - lessonVol[volPosition].signedUp.length) > 0) && positionGoodToVol.includes(volPosition))) {

          console.log(`in for ${volPosition} inThisMonth ${inThisMonth.length}`);

          inThisMonth.forEach((dt) => {
            for (var i in displayRequiredPositions) {
              
              //process thru all dates w/ lessons
              if (displayRequiredPositions[i].date == getFormattedDateTime(dt)) {
                //fill-in the timeslots for positions
                if (displayRequiredPositions[i]['positions'] === undefined) {

                  displayRequiredPositions[i]['positions'] = {
                    [volPosition]: {
                      'timeSlots': [{
                        'startTime':  lesson.startTime,
                        'endTime':  lesson.endTime,
                        'reqd': lessonVol[volPosition].required,
                        'signedUp': lessonVol[volPosition].signedUp.length
                      }]
                    }
                  };
                } else if (displayRequiredPositions[i]['positions'][volPosition] === undefined) {

                  displayRequiredPositions[i]['positions'][volPosition] = {
                    'timeSlots': [{
                      'startTime':  lesson.startTime,
                      'endTime':  lesson.endTime,
                      'reqd': lessonVol[volPosition].required,
                      'signedUp': lessonVol[volPosition].signedUp.length
                    }]
                  }
                } else {

                  displayRequiredPositions[i]['positions'][volPosition]['timeSlots'].push({
                    'startTime':  lesson.startTime,
                    'endTime':  lesson.endTime,
                    'reqd': lessonVol[volPosition].required,
                    'signedUp': lessonVol[volPosition].signedUp.length
                  })
                }

                 break; //Stop this loop, we found it!
              }
            }
          })
        }
      }
    }
    
    return dataHandler({
        status: 200,
        data: displayRequiredPositions,
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
