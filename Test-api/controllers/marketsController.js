const config = require("../config");
const axios = require("axios");

const axiosOptions = {
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json; utf-8",
  },
};

const getAllMarkets = async (vs_currency, page) => {
  const res = await axios
    .get(config.MARKET_URL(vs_currency, page), axiosOptions)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};
const marketsParser = async (req, res) => {
    if(!req.query.vs_currency, !req.query.page){
        return res.status(403).json({ error: "missing something" })
    }
    const marketsData = await getAllMarkets(req.query.vs_currency, req.query.page);
    return res.status(200).json(marketsData);
}
module.exports = {
    marketsParser,
    getAllMarkets
};
