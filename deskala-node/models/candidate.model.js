const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
  result: {
    type: String,
    default: "Shortlisted",
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
