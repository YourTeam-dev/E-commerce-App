const mongoose = require('mongoose');
const User = require('../model/user.model');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function getUserId() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
    const user = await User.findOne().select('_id name').lean();
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('No user found in database.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error fetching user:', error);
    process.exit(1);
  }
}

getUserId();
