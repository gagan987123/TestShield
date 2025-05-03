const express = require("express");
const router = express.Router();
const { runCode } = require("../controllers/compilerController");
const { verifyToken } = require("../middleware/auth");

router.post("/run", verifyToken, runCode);

module.exports = router;
