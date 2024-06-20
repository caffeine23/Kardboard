const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
  title: String,
  description: String,
});

module.exports = mongoose.model("Task", taskSchema);
