const express = require('express');
const router = express.Router();

const meetups = require('./meetups');
const users = require('./users');

router.use(meetups);
router.use(users);

module.exports = router