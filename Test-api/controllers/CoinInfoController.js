const config = require("../config/APIs");
const axios = require("axios");

const axiosOptions = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; utf-8",
  },
};

const getCoinInfo = async (id) => {
  try {
    const res = await axios
      .get(config.COIN_INFO_URL(id), axiosOptions)
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
  if (!req.query.id) {
    return res.status(403).json({ error: "missing something" });
  }
  const CoinInfo = await getCoinInfo(req.query.id);
  return res.status(200).json(CoinInfo);
};
module.exports = {
  CoinParser,
};
