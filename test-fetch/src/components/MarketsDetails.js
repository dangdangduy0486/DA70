import axios from 'axios';
import '../Css/markestDetails.css'

const MarketsDetails = ({ market }) => {

  const handleClick = (value) => {
    const url = 'api/cart'
    axios({
      method: 'post',
      url: url,
      data: {
        name: value.name,
        price: value.current_price,
        amount: '1'
      }
    });
    
    console.log(value)
  }
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
          <td>
            <button type="button" class="btn btn-primary" onClick={() => handleClick(market)} value={market}>
                Buy
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MarketsDetails;
