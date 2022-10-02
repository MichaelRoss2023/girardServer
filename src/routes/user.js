const { 
  getUsers,
  createUser,
  deleteUser, 
  updateUser 
} = require("../controllers/user");
const express = require("express");
const router = require('express').Router();

router.route("/").get(getUsers).post(createUser)
router.route("/:id").delete(deleteUser).put(updateUser)

module.exports = router;