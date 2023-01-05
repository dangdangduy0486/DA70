const config = require("../config/APIs");
const axios = require("axios");

const axiosOptions = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; utf-8",
  },
};

const getCoinInfo = async (vs_currency, ids) => {
  try {
    const res = await axios
      .get(config.COIN_INFO_URL(vs_currency, ids), axiosOptions)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//fetch
const CoinParser = async (req, res) => {
  if (!req.query.vs_currency || !req.query.ids) {
    return res.status(403).json({ error: "missing something" });
  }
  const CoinInfo = await getCoinInfo(req.query.vs_currency, req.query.ids);
  return res.status(200).json(CoinInfo);
};
module.exports = {
  CoinParser,
};
