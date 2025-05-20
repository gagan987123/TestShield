const express = require("express");
const authController = require("../controllers/authController");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/authCheck", verifyToken, authController.authCheck);
router.post(
  "/upload/:userId",
  upload.single("file"),
  authController.uploadfile
);
router.post("/forgot-password", authController.foget_pass);
router.post("/reset-password/:token", authController.reset_pass);
module.exports = router;
