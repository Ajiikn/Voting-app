const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  candidateName: { type: String, required: true },
  category: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  votes: { type: Number, required: true },
  transactionRef: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);