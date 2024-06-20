const Board = require("../models/Board");
const User = require("../models/User");

const createBoard = async (req, res) => {
  const userId = req.userId;
  const { title, desc } = req.body;
  await Board.create({ userId: userId, title: title, description: desc });
  res.send("Board created");
};

const getBoards = async (req, res) => {
  const userId = req.userId;
  const boards = await Board.find({
    $or: [{ userId: userId }, { sharedWith: userId }],
  });
  res.send(boards);
};

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;
  await Board.findByIdAndUpdate(id, {
    title: title,
    description: desc,
  });
  res.send(`Board #${id} updated.`);
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  await Board.findByIdAndDelete(id);
  res.send(`Board #${id} deleted.`);
};

const shareBoard = async (req, res) => {
  try {
    const ownerId = req.userId;
    const { id } = req.params;
    const { username } = req.body;

    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).send("Board not found.");
    }
    if (board.userId.toString() !== ownerId) {
      return res.status(401).send("Only the owner can share the board.");
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(403).send("No user goes by that name.");
    }

    const userId = user._id;
    if (!board.sharedWith.includes(userId)) {
      board.sharedWith.push(userId);
      await board.save();
      return res.status(200).send("Board shared successfully.");
    } else {
      return res.status(400).send("Board is already shared with this user.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error sharing board.");
  }
};

module.exports = {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
  shareBoard,
};
