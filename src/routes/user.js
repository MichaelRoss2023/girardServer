const { 
  create, 
  update 
} = require("../controllers/user");
// const { verifyId } = require("../utils/middlewares");

const express = require("express");
const userRouter = express.Router();

userRouter.route("/")
.post(create)
.put(update)

module.exports = userRouter;