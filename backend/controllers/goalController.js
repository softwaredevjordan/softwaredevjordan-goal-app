const AsyncHandler = require("express-async-handler");
//MongoDB models
const User = require("../models/userModel");
const Goal = require("../models/goalModel");

// @desc get goals
// @route GET /api/goals/
// @access Private

const getGoals = AsyncHandler(async (req, res) => {
  //finding user
  const user = await User.findById(req.user.id);
//if user is not found throw 401
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //retreiving goals
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc get goal
// @route GET /api/goals/:id
// @access Private

const getGoal = AsyncHandler(async (req, res) => {
  //finding user
  const user = await User.findById(req.user.id);
  //if user is not found throw 401
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //retreiving goal
  const goal = await Goal.findOne({ goal: req.params.id });
  // if goal not found throw 401
  if(!goal){
    res.status(401);
    throw new Error("Goal not found");
  }
  res.status(200).json(goal)
  
});

// @desc create a goal
// @route POST /api/goals/
// @access Private

const createGoal = AsyncHandler(async (req, res) => {
  
  const { goalName, goalDescription } = req.body;
//if goal name and description are not provided throw 400 error
  if (!goalName || !goalDescription) {
    res.status(400);
    throw new Error("Please add a goal name and deadline");
  }

  // get user using the id in the jwt
  const user = await User.findById(req.user.id);
  //if no user is found throw 401 error
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //creating goal
  const goal = await Goal.create({
    goalName,
    goalDescription,
    user: req.user.id,
    isDone: false,
  });

  res.status(201).json(goal);
});

// @desc delete a goal
// @route DELETE /api/goals/:id
// @access Private

const deleteGoal = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  //if no user is found throw 401 error
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const goal = await Goal.findById(req.params.id);
  //if goal is not found throw 401 error
  if (!goal) {
    res.status(401);
    throw new Error("Goal not found");
  }
  const goalDelete = await Goal.deleteOne({goal: req.params.id})
  res.status(200).json(goalDelete);
})

// @desc UPDATE a goal
// @route PUT /api/goals/:id
// @access Private

const updateGoal = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  //if no user is found throw 401 error
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(401);
    throw new Error("Goal not found");
  }
  const goalUpdate = await Goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(goalUpdate);
}
)

module.exports = {
  createGoal,
  getGoals,
  getGoal,
  deleteGoal,
  updateGoal,
}
