const MARKET_URL = (vs_currency, order, perPage, page) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

const TRENDING_COIN_URL = () =>
  `https://api.coingecko.com/api/v3/search/trending`;

const COIN_INFO_URL = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;

const EXCHANGE_RATES = (vs_currency, ids) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
// `https://currency-exchange.p.rapidapi.com/exchange`

const HISTORY_CHART = (coinID, days) =>
  `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=${days}`;

module.exports = {
  MARKET_URL,
  TRENDING_COIN_URL,
  COIN_INFO_URL,
  EXCHANGE_RATES,
  HISTORY_CHART,
};
