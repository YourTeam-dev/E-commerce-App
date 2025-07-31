const router = ("express").Router()

router.post("/addComment",require('../controller/comment.controller').addComment)

module.exports = router
// module.exports = ("express").Router().post("/addComment",require('../controller/comment.controller').addComment)