const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { cardId, title, desc } = req.body;
  await Task.create({ cardId: cardId, title: title, description: desc });
  res.send("Task created");
};

const getTasks = async (req, res) => {
  const { cid } = req.params;
  const tasks = await Task.find({ cardId: cid });
  res.send(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;
  await Task.findByIdAndUpdate(id, {
    title: title,
    description: desc,
  });
  res.send(`Task #${id} updated.`);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.send(`Task #${id} deleted.`);
};

const moveTask = async (req, res) => {
  const { id } = req.params;
  const { cardId } = req.body;
  await Task.findByIdAndUpdate(id, {
    cardId: cardId,
  });
  res.send(`Task #${id} moved to card #${cardId}.`);
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask,
};
