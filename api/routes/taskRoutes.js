const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask,
} = require("../controllers/taskController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createTask", verifyToken, createTask);
router.get("/getTasks/:cid", verifyToken, getTasks);
router.patch("/updateTask/:id", verifyToken, updateTask);
router.delete("/deleteTask/:id", verifyToken, deleteTask);
router.patch("/moveTask/:id", verifyToken, moveTask);

module.exports = router;
