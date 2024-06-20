const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  title: String,
});

module.exports = mongoose.model("Card", cardSchema);
