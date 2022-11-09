import axios from "axios";
import "../Css/markestDetails.css";

const MarketsDetails = ({ markets, symbol }) => {
  const handleClick = (value) => {
    const url = "api/cart";
    axios({
      method: "post",
      url: url,
      data: {
        name: value.name,
        price: value.current_price,
        amount: "1",
      },
    });

    console.log(value);
  };
  console.log(symbol)

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Coin</th>
          <th scope="col">Price</th>
          <th scope="col">1h</th>
          <th scope="col">24h</th>
          <th scope="col">7d</th>
          <th scope="col">Volume</th>
          <th scope="col">Market Cap</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {markets &&
          markets.map((market, index) => (
            <tr key={market._id}>
              <th>
                <p>{index + 1}</p>
              </th>
              <td>
                <img src={market.image} alt="" />
                <span>{market.name}</span>
              </td>
              <td>
                <p>{new Intl.NumberFormat("en-US", { style: "currency", "currency":`${symbol}`}).format(market.current_price)}</p>
              </td>
              <td>
                <p>
                  {market.price_change_percentage_1h_in_currency
                    ? market.price_change_percentage_1h_in_currency.toFixed(1)
                    : "?"}
                  %
                </p>
              </td>
              <td>
                <p>
                  {market.price_change_percentage_24h_in_currency
                    ? market.price_change_percentage_24h_in_currency.toFixed(1)
                    : "?"}
                  %
                </p>
              </td>
              <td>
                <p>
                  {market.price_change_percentage_7d_in_currency
                    ? market.price_change_percentage_7d_in_currency.toFixed(1)
                    : "?"}
                  %
                </p>
              </td>
              <td>
                <p>{new Intl.NumberFormat("en-US", { style: "currency", "currency":`${symbol}`}).format(market.total_volume)}</p>
              </td>
              <td>
                <p>{new Intl.NumberFormat("en-US", { style: "currency", "currency":`${symbol}`}).format(market.market_cap)}</p>
              </td>
              <td>
                <button type="button" className="btn btn-success me-2">
                  Trade
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleClick(market)}
                  value={market}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default MarketsDetails;
