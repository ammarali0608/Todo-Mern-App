const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const Todo = require("./models/TODO");
// const todosRows = JSON.stringify(Todo.);

app.get("/abc", async (req, res) => {
  const collectionData = await Todo.find();

  res.render(path.join(__dirname, "pages", "todos.ejs"), { collectionData });
});
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/mytodo", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.redirect("/abc");
});
app.get("/addData", (req, res) => {
  res.render(path.join(__dirname, "pages", "addTodo.ejs"));
  console.log(req.body);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

// show files whose name is ammar

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
