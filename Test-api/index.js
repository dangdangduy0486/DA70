require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 5000;
//create app express
const app = express();

connectDB();

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

//MongoDB
// mongoose
//   .connect(process.env.MONGOURI, { useNewUrlParser: true })
//   .then(() => {
//     console.log("MongoDB successfully connected");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//
app.use("/api/coin-query", require("./routes/coinQueryRoute"));
///

//auth
app.use("/api/auth", require("./routes/authRoute"));

//markets
app.use("/api/markets", require("./routes/marketsRoute"));

//currency
app.use("/api/currency", require("./routes/currencyRoute"));

//trending coin
app.use("/api/trending", require("./routes/trendingCoinsRoute"));

//coin information
app.use("/api/coins", require("./routes/CoinInfoRoute"));

//verify;
// const VerifyJWT = require("./middleware/verifyJWT");
app.use(require("./middleware/verifyJWT"));
// token validate request

//user
app.use("/api/user", require("./routes/userRoutes"));

//exchange
app.use("/api/exchange", require("./routes/exchangeRoute"));

//admin
app.use("/api/admin", require("./routes/adminRoute"));

//wallet
app.use("/api/wallet", require("./routes/walletRoute"));

//history chart
app.use("/api/historyChart", require("./routes/historyChartRoute"));

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

// app.listen(process.env.PORT, "127.0.0.1", () => {
//   console.log(
//     `Server is listening on port http://localhost:${process.env.PORT}...`
//   );
// });

mongoose.connection
  .once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .on("error", (err) => {
    console.log(err);
  });
