const mongoose = require('mongoose');

const historicSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String},
  action:{ enum: ['ADD', 'UPDATE', 'DELETE','COMMENT','REVIEW','VALIDATE']},
  discription: { type: String},
},{
  timestamps: true
});

module.exports = mongoose.model('Historic', historicSchema);