import '../Css/markestDetails.css'
const MarketsDetails = ({ market }) => {
  return (    
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Coin</th>
          <th scope="col">Price</th>
          <th scope="col">24h</th>
          <th scope="col">Volume</th>
          <th scope="col">Market Cap</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <p>{market.id}</p>
          </th>
          <td>
            <img src={market.image} alt="" />
            <h5>{market.name}</h5>
          </td>
          <td>
            <p>${market.current_price}</p>
          </td>
          <td>
            <p>{market.price_change_percentage_24h.toFixed(2)}%</p>
          </td>
          <td>
            <p>{market.total_volume.toFixed(2)}</p>
          </td>
          <td>
            <p>{market.market_cap_change_24h}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MarketsDetails;
