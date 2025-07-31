const Category = require("../model/Category.model");







const createCategory = async (req, res) => {
  try {
    if (!req.body.title)
      return res.status(400).json({ error: "Title is required" });
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(204).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getNestedCategories = async (parentId = null) => {
  const categories = await Category.find({ parentId });

  const results = await Promise.all(
    categories.map(async (cat) => {
      const children = await getNestedCategories(cat._id);
      return {
        _id: cat._id,
        title: cat.title,
        parentId: cat.parentId,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
        children: children,
      };
    })
  );

  return results;
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await getNestedCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const getCategoryPath = async (req, res) => {
  try {
    const path = [];
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    path.push(category);
    while (category.parentId) {
      path.push(category);
      category = await Category.findById(category.parentId);
    }
    
    res.status(200).json({path: path.reverse()});
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const getFeaturedCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parentId: null }).limit(4);
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryPath,
  getFeaturedCategories
};
