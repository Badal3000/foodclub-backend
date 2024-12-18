const express = require("express");
const {getFoodItem, addFoodItem, updateFoodItem, deleteFoodItem} = require("../controllers/food");
const giveAccess = require("../middlewares/access");
const router = express.Router();



router.get("/", getFoodItem);
router.post("/", giveAccess(["ADMIN", "SUPER_ADMIN"]), addFoodItem);
router.patch("/", giveAccess(["ADMIN", "SUPER_ADMIN"]), updateFoodItem);
router.delete("/" , giveAccess(["ADMIN", "SUPER_ADMIN"]), deleteFoodItem);

module.exports = router;
