const mongoose = require('mongoose');
const { useId } = require('react');

// const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  release_year: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);