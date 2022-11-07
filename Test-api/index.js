require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//create app express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

//MongoDB
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true })
        .then(() => {
            console.log('MongoDB successfully connected')
        })
        .catch((error) => {
            console.log(error)
        })

//router
const weather = require('./controllers/weatherController');
app.get('/api/weather', weather.weatherParser);

const markets = require('./routes/marketsRoute');
// const markets = require('./controllers/marketsController');

app.use("/api/markets", markets);
// app.get('/api/markets', markets.marketsParser)

//currency
const currencyRoute = require('./routes/currencyRoute');
app.use("/api/currency", currencyRoute)

const cartRoute = require("./routes/cartRoute");
app.use("/api/cart", cartRoute)

app.listen(process.env.PORT, '127.0.0.1', () => {
    console.log(`Server is listening on port http://localhost:${process.env.PORT}...`);
});