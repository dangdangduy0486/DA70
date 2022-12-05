require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const cors = require("cors");

//create app express
const app = express();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//MongoDB
mongoose
  .connect(process.env.MONGOURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((error) => {
    console.log(error);
  });

//
const coinQueryRoute = require("./routes/coinQueryRoute");
app.use("/api/coin-query", coinQueryRoute);
///

//auth
const authRoute = require("./routes/authRoute");
app.use("/api/auth", authRoute);

//markets
const marketsRoute = require("./routes/marketsRoute");
app.use("/api/markets", marketsRoute);

//currency
const currencyRoute = require("./routes/currencyRoute");
app.use("/api/currency", currencyRoute);

//trending coin
const trendingCoinsRoute = require("./routes/trendingCoinsRoute");
app.use("/api/trending", trendingCoinsRoute);

//coin information
const CoinInfoRoute = require("./routes/CoinInfoRoute");
app.use("/api/coins", CoinInfoRoute);

//verify;
// const VerifyJWT = require("./middleware/verifyJWT");
// app.use(VerifyJWT);
// token validate request

//user
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

//exchange
const exchangeRoute = require("./routes/exchangeRoute");
app.use("/api/exchange", exchangeRoute);

//admin
const adminRoute = require("./routes/adminRoute");
app.use("/api/admin", adminRoute);

//wallet
const walletRoute = require("./routes/walletRoute");
app.use("/api/wallet", walletRoute);

app.use("*", (req, res) => {
  res.status(404).send({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log(
    `Server is listening on port http://localhost:${process.env.PORT}...`
  );
});
