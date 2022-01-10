const Candidate = require("../models/candidate.model");
const User = require("../models/user.model");

exports.candidateById = (req, res, next, id) => {
  Candidate.findById(id).exec((err, candidate) => {
    if (err || !candidate) {
      return res.status(400).json({
        error: "Candidate not found",
      });
    }
    req.candidate = candidate;
    next();
  });
};

exports.updateCandidate = (req, res) => {
  const updateKeys = Object.keys(req.body);
  updateKeys.map((key) => {
    req.candidate[key] = req.body[key];
  });
  req.candidate.save();
  res.send({ message: "updated!" });
};

exports.deleteCandidate = (req, res) => {
  const { createdBy, _id } = req.candidate;
  req.candidate.remove();
  User.findById(createdBy).exec((err, user) => {
    if (err) return;
    user.candidates= user.candidates.filter((id) => id.toString() !== _id.toString());
    user.save();
  });
  res.json({ message: "deleted candidate" });
};
