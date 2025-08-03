const express = require('express');
const router = express.Router();
const { signup, login, getUser,upgradeUser} = require('../controller/user.controller');
const {isAuth} = require('../midllwear')

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile',isAuth,getUser)
router.post('/profile',isAuth,upgradeUser)

module.exports = router;
