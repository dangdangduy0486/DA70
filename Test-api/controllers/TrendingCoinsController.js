const config = require("../config/APIs");
const axios = require("axios");

const verifyUser = require("../middleware/verifyUser");
const jwt = require("jsonwebtoken");

const axiosOptions = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; utf-8",
  },
};

const getTrendingCoins = async () => {
  try {
    const res = await axios
      .get(config.TRENDING_COIN_URL(), axiosOptions)
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
const TredingCoinsParser = async (req, res) => {
  const TredingCoinsData = await getTrendingCoins();
  return res.status(200).json(TredingCoinsData);
};
module.exports = {
  getTrendingCoins,
  TredingCoinsParser,
};
