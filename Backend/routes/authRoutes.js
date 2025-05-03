const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
