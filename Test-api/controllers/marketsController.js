const config = require("../config");
const axios = require("axios");
const { response } = require("express");

const axiosOptions = {
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json; utf-8",
    "FTX-KEY": "ArsOY7dObLjdWCCxDvC50v3v6tFhqyMlyKSo-tOp",
  },
};

const getAllMarkets = async () => {
  const res = await axios
    .get(config.FTX_URL(), axiosOptions)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return res.data;
};
const marketsParser = async (req, res) => {
    // if(!req.query.params){
    //     return res.status(403).json({ error: "missing params" })
    // }
    const marketsData = await getAllMarkets();
    return res.status(200).json(marketsData);
}
module.exports = {
    marketsParser,
    getAllMarkets
};
