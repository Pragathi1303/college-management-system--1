const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./Utils/db");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const applicationRoutes = require("./routes/applications");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CampusFlow Backend Running ✅" });
});

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
  );
});
