const MARKET_URL = (vs_currency, page) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

const TRENDING_COIN_URL = () => `https://api.coingecko.com/api/v3/search/trending`

const COIN_INFO_URL = (id) => `https://api.coingecko.com/api/v3/coins/${id}`
 
module.exports = {
    MARKET_URL,
    TRENDING_COIN_URL,
    COIN_INFO_URL
}   