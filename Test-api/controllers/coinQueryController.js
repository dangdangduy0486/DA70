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

const autoSaveCoinInfo = async (req, res) => {
  try {
    const coin = await Coin.find({});
    // for (let i = 0; i < coin.length; i++) {
    //   const CoinInfo = await getCoinInfo(coin[i].coinID);
    //   if (coin[i].image.thumb !== "") {
    //     continue;
    //   } else {
    //     await Coin.findOneAndUpdate(
    //       {
    //         coinID: CoinInfo.id,
    //       },
    //       {
    //         images: {
    //           thumb: CoinInfo.image.thumb,
    //           small: CoinInfo.image.small,
    //           large: CoinInfo.image.large,
    //         },
    //       }
    //     );
    //   }
    // }
    let i = 0;
    setInterval(async () => {
      const CoinInfo = await getCoinInfo(coin[i].coinID);
      await Coin.findOneAndUpdate(
        {
          coinID: CoinInfo.id,
        },
        {
          images: {
            thumb: CoinInfo.image.thumb,
            small: CoinInfo.image.small,
            large: CoinInfo.image.large,
          },
        }
      );
    }, 30000);
    res.status(200).send({
      message: "Update coin success",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
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
  autoSaveCoinInfo,
};
