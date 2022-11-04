const express = require('express');
const bodyParser = require('body-parser');

//router

//create app express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     const d = new Date();
//     res.json({ currentTime: d.toTimeString() });
//     console.log('Recieved Get request...');
// });
const weather = require('./controllers/weatherController');
app.get('/api/weather', weather.weatherParser);

const markets = require('./routes/marketsRoute');
// const markets = require('./controllers/marketsController');

app.use("/api/markets", markets);
// app.get('/api/markets', markets.marketsParser)

const PORT = 5000;

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is listening on port ${PORT}...`);
});