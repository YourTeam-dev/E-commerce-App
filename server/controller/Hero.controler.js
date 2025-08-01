const Hero = require("../model/Hero.model");

const getHeroSlider = async(req,res)=> {
  try {
    const hero = await Hero.find().limit(5);
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
const updateHero = async(req,res)=> {
  try {
    const {id} = req.params;
    const hero = await Hero.findByIdAndUpdate(id,req.body);
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
const deleteHero = async(req,res)=> {
  try {
    const {id} = req.params;
    const hero = await Hero.findByIdAndDelete(id);
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
module.exports={getHeroSlider,updateHero,deleteHero}