const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todo: String,
  completed: Boolean,
  emailId: String,
  todoId: String,
});

const addTodo = async (data) => {
  const Todo = mongoose.model("Todo", todoSchema);
  data.todoId = uuidv4();
  try {
    const newTodo = new Todo(data);
    const savedTodo = await newTodo.save();
    return "sucessfully saved";
  } catch (error) {
    console.log("error saving todo ", error);
    return "failed to save";
  }
};
const deleteTodo = async (data) => {
  const Todo = mongoose.model("Todo", todoSchema);
  try {
    const result = await Todo.deleteOne({ todoId: data.todoId });
    return result.deletedCount + " todo succesfully deleted";
  } catch (error) {
    console.log("database error ", error);
    return "failed to delete the todo";
  }
};
const getTodos = async (data) => {
  const Todo = mongoose.model("Todo", todoSchema);
  try {
    const allTodos = await Todo.find({ email: data.email });
    return allTodos;
  } catch (error) {
    console.log("database error ", error);
    return [];
  }
};
const updateTodo = async (data) => {
  const Todo = mongoose.model("Todo", todoSchema);
  try {
    const updatedTodo = await Todo.updateOne(
      { todoId: data.todoId },
      { $set: data.updatedData }
    );
    return "succesfully updated the todo data";
  } catch (error) {
    console.log("database error ", error);
    return "failed to update data";
  }
};

module.exports = { addTodo, deleteTodo, getTodos, updateTodo };
