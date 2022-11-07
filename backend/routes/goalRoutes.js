const express = require("express");
const router = express.Router();

const { createGoal, getGoals, getGoal, deleteGoal, updateGoal } = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getGoals)
  .post(protect, createGoal);
  router.route('/:id').get(protect,getGoal).delete(protect, deleteGoal).put(protect, updateGoal)
  
module.exports = router;
