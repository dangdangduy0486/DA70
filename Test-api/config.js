// const summonerByNameUrl = (region, summonerName) => `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;


// const weatherUrl = (cityName) => `http://api.weatherapi.com/v1/current.json?key=3802856f6798411cb2b81923220311&q=${cityName}`;

const MARKET_URL = (vs_currency, page) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

const TRENDING_COIN_URL = () => `https://api.coingecko.com/api/v3/search/trending`

module.exports = {
    MARKET_URL,
    TRENDING_COIN_URL
}   