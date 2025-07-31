const express = require('express');
const router = express.Router();
const { signup, login } = require('../controller/user.controller');
const { isAdmin,isSeller,isAuth } = require('../midlleweare');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
