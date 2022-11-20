const express = require("express");
const {
    getAllcartItems,
    createCart
} = require("../controllers/CartController");

const router = express.Router();

//Get all workouts
router.get("/", getAllcartItems);

//Get a single workout
// router.get("/:id", getCurrency);

//Post a new workout
router.post("/", createCart);

//Delete a workout
// router.delete("/:id", deleteCurrency);

//update a workout
// router.patch("/:id", updateCurrency);

//get currencies by category
// router.get("/:category", updateCurrency);


module.exports = router;
