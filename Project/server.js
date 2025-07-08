const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

app.use("/api/users", require("./server/routes/userRoutes.js"));
app.use("/api/contacts", require("./server/routes/contactRoutes.js"));
app.use("/api/projects", require("./server/routes/projectRoutes.js"));
app.use("/api/education", require("./server/routes/educationRoutes.js"));
app.use("/api/auth", require("./server/routes/authRoutes.js"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to My PortFolio Application." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});