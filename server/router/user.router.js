const express = require('express');
const router = express.Router();
const { signup, login } = require('../controller/user.controller');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
