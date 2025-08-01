const router = require("express").Router();
const { deleteHero,getHeroSlider,updateHero } = require("../controller/Hero.controler");
const { isAdmin } = require("../midllwear");


router.get("/getHero", getHeroSlider);
router.put("/updateHero/:id",isAdmin, updateHero);
router.delete("/deleteHero/:id",isAdmin, deleteHero);


module.exports = router;