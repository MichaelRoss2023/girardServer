const express = require("express");
const router = require('express').Router();
const Horse = require('../models/horses');
const { createHorses, getHorses, deleteHorses, updateHorses } = require('../controllers/horses');

router.route('/').get(getHorses).post(createHorses);
router.route('/:id').delete(deleteHorses).put(updateHorses);

module.exports = router;