const config = require("../config/APIs");
const axios = require("axios");

const axiosOptions = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; utf-8",
  },
};

const getMarkets = async (vs_currency, category, order, perPage, page) => {
  const res = await axios
    .get(
      config.MARKET_URL(vs_currency, category, order, perPage, page),
      axiosOptions
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};
const getMarketsAll = async (vs_currency, order, perPage, page) => {
  const res = await axios
    .get(config.MARKET_URL_ALL(vs_currency, order, perPage, page), axiosOptions)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};

const marketsParser = async (req, res) => {
  if (
    (!req.query.vs_currency,
    !req.query.page,
    !req.query.perPage,
    !req.query.order)
  ) {
    return res.status(403).json({ error: "missing something" });
  }

  if (req.query.category === "all") {
    let marketsData = await getMarketsAll(
      req.query.vs_currency,
      req.query.order,
      req.query.perPage,
      req.query.page
    );
    return res.status(200).json(marketsData);
  } else {
    let marketsData = await getMarkets(
      req.query.vs_currency,
      req.query.category,
      req.query.order,
      req.query.perPage,
      req.query.page
    );
    return res.status(200).json(marketsData);
  }
};
module.exports = {
  marketsParser,
};
