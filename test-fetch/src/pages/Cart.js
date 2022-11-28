// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <table className="table table-hover table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <span>Bitcoin</span>
              <span>
                <img
                  src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579"
                  alt="..."
                />
              </span>
            </td>
            <td>0.11</td>
            <td></td>
            <td>
              <strong className="text-warning">PENDING</strong>
              <strong className="text-danger">DENIED</strong>
              <strong className="text-success">APPROVED</strong>
            </td>
            <td>
              <Button></Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Cart;
