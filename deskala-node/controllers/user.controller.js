const Candidate = require("../models/candidate.model");
const User = require("../models/user.model");


exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("candidates")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.user = user;
      next();
    });
};

exports.addCandidate = (req, res) => {
  const candidate = new Candidate(req.body);
  candidate.createdBy = req.user._id;
  candidate.save();
  req.user.candidates.push(candidate._id);
  req.user.save();
  res.json({ message: "candidate added successfully!" });
};

exports.getCandidatesList = (req, res) => {
  res.send(req.user.candidates);
};
