const express = require("express");
const userRouter = require("./user");
const skillRouter = require("./skill");
const positionRouter = require("./position");
const lessonRouter = require("./lesson");
const horseRouter = require("./horse");

const router = express.Router();

router.use("/users", userRouter);
router.use("/positions", positionRouter);
router.use("/horses", horseRouter);
router.use("/skills", skillRouter);
router.use("/lessons", lessonRouter);

module.exports = router;