const config = require("../config");
const axios = require("axios");
const Coin = require("../models/coin");
const axiosOptions = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; utf-8",
  },
};

const getCoinInfo = async (coinID) => {
  try {
    const res = await axios
      .get(config.COINS_QUERY(coinID), axiosOptions)
      .then((response) => {
        if (!response) return null;
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

const CoinParser = async (req, res) => {
  if (!req.query.coinID) {
    return res.status(403).json({ error: "missing something" });
  }
  const CoinInfo = await getCoinInfo(req.query.coinID);
  return res.status(200).json(CoinInfo);
};

const getCoinQuery = async (req, res) => {
  try {
    const coins = await Coin.find({});

    res.status(200).send({
      coins,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

// const addCoin = async (req, res) => {
//   try {
//     const coin = await Coin.create({
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "Internal Server Error",
//       error: error,
//     });
//   }
// };

module.exports = {
  CoinParser,
  getCoinQuery,
};
