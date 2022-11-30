require("dotenv").config();
const Transaction = require("../models/transaction");
const CryptoJS = require("crypto-js");

const generateMD5 = () => {
  const hash = CryptoJS.MD5(process.env.SECRET_KEY);
  const base64 = hash
    .toString(CryptoJS.enc.Base64)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return base64;
};
const hash = (value) => {
  CryptoJS.AES.encrypt(value, generateMD5()).toString();
};

const createTransation = async (req, res) => {
  try {
    let { TxnHash, method, from, to, value, TxnFree } = req.body;
    const currentTransaction = await Transaction.find({
      TxnHash,
    });

    if (TxnHash == currentTransaction.TxnHash) {
      return res.status(400).json({ error: "Transaction already exists!!" });
    }

    await Transaction.create({
      TxnHash: hash(TxnHash),
      method: method,
      age: new Date(),
      from: hash(from),
      to: hash(to),
      value: value,
      TxnFree: TxnFree,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

const editTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      TxnHash: req.body.TxnHash,
    });

    if (!transaction) {
      return res.status(400).send({
        message: "Invalid link",
      });
    }

    

  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = {
  createTransation,
};
