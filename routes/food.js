const express = require("express");
const {getFoodItem, addFoodItem, updateFoodItem, deleteFoodItem, getSingleFood} = require("../controllers/food");
const giveAccess = require("../middlewares/access");
const router = express.Router();

router.get("/", getFoodItem);
router.post("/", addFoodItem);
router.get("/:food_id" , getSingleFood);
router.patch("/", giveAccess(["ADMIN", "SUPER_ADMIN"]), updateFoodItem);
router.delete("/" , giveAccess(["ADMIN", "SUPER_ADMIN"]), deleteFoodItem);

module.exports = router;
