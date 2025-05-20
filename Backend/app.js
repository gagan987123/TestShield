const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const compilerRoutes = require("./routes/compilerRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("🚀 Welcome to TestShield Backend API");
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/compiler", compilerRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// server/
// ├── controllers/
// │   ├── authController.js
// │   ├── testController.js
// │   ├── compilerController.js
// │   └── adminController.js
// │
// ├── models/
// │   ├── User.js
// │   ├── Test.js
// │   ├── Question.js
// │   ├── Submission.js
// │   └── ViolationLog.js
// │
// ├── routes/
// │   ├── authRoutes.js
// │   ├── testRoutes.js
// │   ├── compilerRoutes.js
// │   └── adminRoutes.js
// │
// ├── middleware/
// │   ├── authMiddleware.js
// │   └── antiCheatMiddleware.js
// │
// ├── services/
// │   └── judge0Service.js
// │
// ├── config/
// │   └── db.js
// │
// ├── app.js
// └── .env
