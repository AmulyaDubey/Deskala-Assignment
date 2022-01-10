const express = require("express");
const router = express.Router();

const { updateCandidate, deleteCandidate , candidateById} = require("../controllers/candidate.controller");

router.put("/update-candidate/:candidateId", updateCandidate);
router.delete("/delete-candidate/:candidateId", deleteCandidate);

router.param("candidateId", candidateById);

module.exports = router;
