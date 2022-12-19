const config = require("../config/APIs");
const axios = require("axios");

const axiosOptions = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; utf-8",
  },
};

const getExchangRates = async (vs_currency, ids) => {
  const res = await axios
    .get(config.EXCHANGE_RATES(vs_currency, ids), axiosOptions)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
    
  return res.data;
};
const exchangeRatesParser = async (req, res) => {
  if ((!req.query.vs_currency, !req.query.ids)) {
    return res.status(403).json({ error: "missing something" });
  }
  const exchangeRatesData = await getExchangRates(req.query.vs_currency, req.query.ids);
  return res.status(200).json(exchangeRatesData);
};
module.exports = {
  exchangeRatesParser,
};
