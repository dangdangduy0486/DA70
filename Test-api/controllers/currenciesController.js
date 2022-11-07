const Currency = require("../models/currency");
const mongoose = require("mongoose");

// get all currency
const getAllCurrencies = async (req, res) => {
  const currency = await Currency.find({}).sort({ createAt: -1 });

  res.status(200).json(currency);
};

//get a currency
const getCurrency = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not found" });
  }

  const currency = await Currency.findById(id);

  if (!currency) {
    return res.status(404).json({ error: "Not found" });
  }

  res.status(200).json(currency);
};

//create new currency
const createCurrency = async (req, res) => {
  const { name, symbol, category } = req.body;
  if(!name || !symbol || !category ){
    return res.status(403).json({ error: "missing something" })
  }
  const currency = await Currency.find({}).sort({ createAt: -1 });
  if(currency.name == name || currency.symbol == symbol){
    return res.status(400).json({ error: "Currencies already exists" })
  }else{
    try {
      const currency = await Currency.create({
        name,
        symbol,
        category
      });
      res.status(200).json(currency);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
};

//delete a currency
const deleteCurrency = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not found" });
  }

  const currency = await Currency.findOneAndDelete({ _id: id });

  if (!currency) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json(currency);
};
//update a currency
const updateCurrency = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not found" });
  }

  const currency = await Currency.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!currency) {
    return res.status(404).json({ error: "Not found" });
  }

  res.status(200).json(currency);
};
//get currencies by category
const getByCategory = async (req, res) => {
  const { category } = req.params;

  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(404).json({ error: "Not found" });
  }
  const currency = await Currency.find({ category: category });

  if (!currency) {
    return res.status(404).json({ error: "Not found" });
  }

  res.status(200).json(currency);
};

module.exports = {
  getAllCurrencies,
  getCurrency,
  createCurrency,
  deleteCurrency,
  updateCurrency,
  getByCategory
};
