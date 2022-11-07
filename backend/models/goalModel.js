const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  goalName: {
    type: String,
    required: [true, "Please add a name"],
  },
  goalDescription: {
    type: String,
    required: [true, "Please explain how you are going to acheive this goal"],
  },
 
});

module.exports = mongoose.model("Goal", goalSchema);
