const express = require("express");

const {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} = require("../models/todos_db.js");

const Router = express.Router();

Router.get("/alltodos", async (req, res) => {
  data = req.body;
  console.log(data);
  status_code = 400;
  try {
    const todos = await getTodos(data);
    status_code = 200;
    return res.status(status_code).json({ message: "succes", todos: todos });
  } catch (error) {
    console.log("error fetching data", error);
    return res.status(status_code).json({ message: "failed to fetch data" });
  }
});

Router.post("/addTodo", async (req, res) => {
  data = req.body;
  status_code = 400;
  try {
    const todos = await addTodo(data);
    status_code = 200;
    return res.status(status_code).json({ message: "succes" });
  } catch (error) {
    console.log("error fetching data", error);
    return res.status(status_code).json({ message: "failed to add todo" });
  }
});

Router.post("/deleteTodo", async (req, res) => {
  data = req.body;
  status_code = 400;
  console.log("data", data);
  try {
    const todos = await deleteTodo(data);
    status_code = 200;
    return res.status(status_code).json({ message: "succes" });
  } catch (error) {
    console.log("error fetching data", error);
    return res.status(status_code).json({ message: "failed to delte todo" });
  }
});

Router.post("/updateTodo", async (req, res) => {
  data = req.body;
  status_code = 400;
  console.log("data", data);
  try {
    const todos = await updateTodo(data);
    status_code = 200;
    return res.status(status_code).json({ message: "succes" });
  } catch (error) {
    console.log("error fetching data", error);
    return res.status(status_code).json({ message: "failed to delte todo" });
  }
});

module.exports = Router;
