const config = require("../config/APIs");
const axios = require("axios");

const axiosOptions = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; utf-8",
  },
};

const getHistoryChartInfo = async (coinID, days) => {
  const res = await axios
    .get(config.HISTORY_CHART(coinID, days), axiosOptions)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return res.data;
};
const historyChartInfoParser = async (req, res) => {
  if ((!req.query.coinID, !req.query.days)) {
    return res.status(403).json({ error: "missing something" });
  }
  const historyChartInfo = await getHistoryChartInfo(
    req.query.coinID,
    req.query.days
  );
  return res.status(200).json(historyChartInfo);
};
module.exports = {
  historyChartInfoParser,
};
