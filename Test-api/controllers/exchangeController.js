const config = require("../config");
const axios = require("axios");

const axiosOptions = {
  headers: {
    "X-RapidAPI-Key": "7e82dd1df9msh095805028814fb9p185240jsn7647ff8a5fb2",
    "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
  },
};

const getExchangRates = async (from, to) => {
  const res = await axios
    .get(config.EXCHANGE_RATES(), {
      params: {
        from: from,
        to: to,
        q: "1",
      },
      headers: {
        "X-RapidAPI-Key": "7e82dd1df9msh095805028814fb9p185240jsn7647ff8a5fb2",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};
const exchangeRatesParser = async (req, res) => {
  if ((!req.query.from, !req.query.to)) {
    return res.status(403).json({ error: "missing something" });
  }
  const exchangeRatesData = await getExchangRates(req.query.from, req.query.to);
  return res.status(200).json(exchangeRatesData);
};
module.exports = {
  exchangeRatesParser,
};
