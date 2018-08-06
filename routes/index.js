const express = require('express');
const router = express.Router();

const meetups = require('./meetups');
const users = require('./users');
const profiles = require('./profiles');

router.use(meetups);
router.use(users);
router.use(profiles);

module.exports = router