const Historic = require('../../model/Historic.model');

// Get all historic records for a user
const getUserHistoric = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }

    const historic = await Historic.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    res.status(200).json({
      success: true,
      data: historic,
      count: historic.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching historic records',
      error: error.message
    });
  }
};

// Create a new historic record
const createHistoric = async (req, res) => {
  try {
    const { userId, title, action, discription } = req.body;

    if (!userId || !title || !action) {
      return res.status(400).json({
        success: false,
        message: 'User ID, title, and action are required'
      });
    }

    const historic = new Historic({
      userId,
      title,
      action,
      discription
    });

    await historic.save();

    res.status(201).json({
      success: true,
      data: historic,
      message: 'Historic record created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating historic record',
      error: error.message
    });
  }
};

// Get all historic records (admin)
const getAllHistoric = async (req, res) => {
  try {
    const historic = await Historic.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    res.status(200).json({
      success: true,
      data: historic,
      count: historic.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching historic records',
      error: error.message
    });
  }
};

// Delete historic record
const deleteHistoric = async (req, res) => {
  try {
    const { id } = req.params;

    const historic = await Historic.findByIdAndDelete(id);

    if (!historic) {
      return res.status(404).json({
        success: false,
        message: 'Historic record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Historic record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting historic record',
      error: error.message
    });
  }
};

module.exports = {
  getUserHistoric,
  createHistoric,
  getAllHistoric,
  deleteHistoric
};
