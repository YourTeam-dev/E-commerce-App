const Hero = require("../model/Hero.model");

const getHeroSlider = async (req, res) => {
  try {
    const hero = await Hero.find()
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const addHero = async (req, res) => {
  try {
    const image = req.file.filename;
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }
    const { title, subtitle, description, category } = req.body;
    const hero = new Hero({ title, subtitle, description, category, image });
    await hero.save();
    res.status(201).json(hero);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const updateHero = async (req, res) => {
  try {
    const image = req.file.filename;
    const { title, subtitle, description, category } = req.body;
    const { id } = req.params;
    const hero = await Hero.findByIdAndUpdate(id, {
      title,
      subtitle,
      description,
      category,
      image,
    });
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const deleteHero = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await Hero.findByIdAndDelete(id);
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
module.exports = { getHeroSlider, updateHero, deleteHero, addHero };
