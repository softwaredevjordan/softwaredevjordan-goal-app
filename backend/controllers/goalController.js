const AsyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Goal = require("../models/goalModel");

// @desc create a goal
// @route GET /api/goals/
// @access Private

const getGoals = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const goals = await Goal.find({ user: req.user.id });
  //const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc create a goal
// @route POST /api/goals/
// @access Private

const createGoal = AsyncHandler(async (req, res) => {
  console.log("I have been ran");
  const { goalName, goalDescription } = req.body;

  if (!goalName || !goalDescription) {
    res.status(400);
    throw new Error("Please add a goal name and deadline");
  }

  // get user using the id in the jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const goal = await Goal.create({
    goalName,
    goalDescription,
    user: req.user.id,
    isDone: false,
  });

  res.status(201).json(goal);
});

module.exports = {
  createGoal,
  getGoals,
};
