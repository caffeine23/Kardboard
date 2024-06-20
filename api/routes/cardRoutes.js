const express = require("express");
const {
  createCard,
  getCards,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createCard", verifyToken, createCard);
router.get("/getCards/:bid", verifyToken, getCards);
router.patch("/updateCard/:id", verifyToken, updateCard);
router.delete("/deleteCard/:id", verifyToken, deleteCard);

module.exports = router;
