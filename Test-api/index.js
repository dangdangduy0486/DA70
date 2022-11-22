require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const cors = require("cors");

//create app express
const app = express();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

//MongoDB
mongoose
  .connect(process.env.MONGOURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((error) => {
    console.log(error);
  });

//admin
const adminRoute = require("./routes/adminRoute");
app.use("/api/admin", adminRoute)

//user
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

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

//exchange
const exchangeRoute = require("./routes/exchangeRoute");
app.use("/api/exchange", exchangeRoute);

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log(
    `Server is listening on port http://localhost:${process.env.PORT}...`
  );
});
