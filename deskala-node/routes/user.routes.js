const express = require("express");
const router = express.Router();

const {
  addCandidate,
  userById,
  getCandidatesList,
} = require("../controllers/user.controller");

router.post("/add-candidate/:userId", addCandidate);
router.get("/get-candidates/:userId", getCandidatesList);

router.param("userId", userById);

module.exports = router;
