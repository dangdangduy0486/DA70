const summonerByNameUrl = (region, summonerName) => `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;


const weatherUrl = (cityName) => `http://api.weatherapi.com/v1/current.json?key=3802856f6798411cb2b81923220311&q=${cityName}`;

const FTX_URL = () => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false`;
module.exports = {
    summonerByNameUrl,
    weatherUrl,
    FTX_URL
}