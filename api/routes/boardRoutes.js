const express = require("express");
const {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
  shareBoard,
} = require("../controllers/boardController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createBoard", verifyToken, createBoard);
router.get("/getBoards", verifyToken, getBoards);
router.patch("/updateBoard/:id", verifyToken, updateBoard);
router.delete("/deleteBoard/:id", verifyToken, deleteBoard);
router.patch("/shareBoard/:id", verifyToken, shareBoard);

module.exports = router;
