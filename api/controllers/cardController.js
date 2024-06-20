const Card = require("../models/Card");

const createCard = async (req, res) => {
  const { boardId, title } = req.body;
  await Card.create({ boardId: boardId, title: title });
  res.send("Card created");
};

const getCards = async (req, res) => {
  const { bid } = req.params;
  const cards = await Card.find({ boardId: bid });
  res.send(cards);
};

const updateCard = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await Card.findByIdAndUpdate(id, {
    title: title,
  });
  res.send(`Card #${id} updated.`);
};

const deleteCard = async (req, res) => {
  const { id } = req.params;
  await Card.findByIdAndDelete(id);
  res.send(`Card #${id} deleted.`);
};

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard,
};
