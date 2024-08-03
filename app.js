//package imports
const express = require("express");
var cors = require("cors");

const userRouter = require("./controllers/users.js");
const todosRouter = require("./controllers/todos.js");
const { connectToDataBase } = require("./db/connection.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the routers correctly
app.use("/user", userRouter);
app.use("/todo", todosRouter);

app.get("/", async (req, res) => {
  return res.send("Server running");
});

connectToDataBase();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
