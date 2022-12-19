const express = require("express");
const {
    getAllCurrencies,
    getCurrency,
    createCurrency,
    deleteCurrency,
    updateCurrency,
    getByCategory
} = require("../controllers/currenciesController");

const router = express.Router();

//Get all workouts
router.get("/", getAllCurrencies);

//Get a single workout
router.get("/:id", getCurrency);

//Post a new workout
router.post("/", createCurrency);

//Delete a workout
router.delete("/:id", deleteCurrency);

//update a workout
router.patch("/:id", updateCurrency);

//get currencies by category
router.get("/:category", updateCurrency);


module.exports = router;
