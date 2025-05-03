const express = require("express");
const testController = require("../controllers/testController");
const { verifyToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");
const router = express.Router();

router.post("/create", testController.postTest);
router.post("/:testid/add", verifyToken, isAdmin, testController.AddQues);
router.post("/:testid/rmv", verifyToken, isAdmin, testController.RmvQues);
router.put(
  "/:testid/update/:questionId",
  verifyToken,
  isAdmin,
  testController.updateQuestion
);

router.put("/:testid/publish", testController.publishTest);
router.post("/submit", verifyToken, testController.submitTest);
module.exports = router;
