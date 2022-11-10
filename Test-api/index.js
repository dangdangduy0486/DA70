require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//create app express
const app = express();

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

//user
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

//markets
const markets = require("./routes/marketsRoute");
app.use("/api/markets", markets);
// app.get('/api/markets', markets.marketsParser)

//currency
const currencyRoute = require("./routes/currencyRoute");
app.use("/api/currency", currencyRoute);

//cart
const cartRoute = require("./routes/cartRoute");
app.use("/api/cart", cartRoute);

//trending coin
const trendingCoinsRoute = require("./routes/trendingCoinsRoute");
app.use("/api/trending", trendingCoinsRoute);

//coin information
const CoinInfoRoute = require("./routes/CoinInfoRoute");
app.use("/api/coins", CoinInfoRoute);

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log(
    `Server is listening on port http://localhost:${process.env.PORT}...`
  );
});
