const mongoose = require("mongoose");
const Todos = require("../dbTodos");

const getTodos = async (req, res) => {
  try {
    const allTodos = await Todos.find({}).sort({ createdAt: -1 });
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createTodos = async (req, res) => {
  const dbTodos = req.body;
  try {
    const newTodos = await Todos.create(dbTodos);
    res.status(201).send(newTodos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTodos = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`There is no todo with this id of ${id}`);
    }
    const todoID = { _id: id };
    const update = { completed: true };
    const updateTodo = await Todos.findOneAndUpdate(todoID, update);
    if (!updateTodo) {
      return res.status(404).send(`There is no todo with this id of ${id}`);
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTodos = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodos = await Todos.findByIdAndRemove(id);
    if (!deletedTodos) {
      return res.status(404).send("Todo not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
};
