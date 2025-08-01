const express = require("express");
const router = express.Router();
router.post("/addComment",require('../controller/comment.controller').addComment)

module.exports = router
