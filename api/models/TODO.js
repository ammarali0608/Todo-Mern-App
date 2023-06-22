const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");
const Schema = moongoose.Schema;
const TodoSchema = new Schema({
  text: { type: String, required: true },
  complete: { type: Boolean, default: false },
  timestamp: { type: String, default: Date.now() },
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;

