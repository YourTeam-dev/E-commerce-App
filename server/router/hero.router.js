const router = require("express").Router();
const { deleteHero,getHeroSlider,updateHero,addHero } = require("../controller/Hero.controler");
const { isAdmin } = require("../midllwear");
const upload = require("../images/multer.config");


router.get("/getHero", getHeroSlider);
router.post("/addHero", isAdmin, upload.single("image"), addHero);
router.put("/updateHero/:id",isAdmin, upload.single("image"), updateHero);
router.delete("/deleteHero/:id",isAdmin, deleteHero);


module.exports = router;