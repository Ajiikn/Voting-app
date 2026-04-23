const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, default: '' }, // filename or base64
  votes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);