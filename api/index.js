const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const cardRoutes = require("./routes/cardRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./utils/errorHandler");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

app.get("/test", (req, res) => {
  res.send("Server is up.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
