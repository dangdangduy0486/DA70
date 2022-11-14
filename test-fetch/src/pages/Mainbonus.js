// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import useAxios from "../Data/useAxios";
import "../Css/Mainbonus.css";
import TrendingCoins from "../components/TrendingCoins";
const Mainbonus = () => {

  return (
    <div className="cover">
      <div className="cover_top">
        <h1>Future of</h1>
        <h1>The World</h1>
        <p>
          Making money is art and working is art and good business is the best
          art.
        </p>
        <Link className="regis-button" to="/signup">
          Register Now
        </Link>
        <Link className="regis-button" to="/markets">
          Buy Now
        </Link>
      </div>
      <TrendingCoins />
      <div className="cover_bot">
        <div className="cover_bot_item">
          <img
            src="https://images.unsplash.com/photo-1652991588468-f3c7e2083ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt=""
          />
          <h2>akjlasjdlkajf</h2>
        </div>
        <div className="cover_bot_item">
          <img
            src="https://images.unsplash.com/photo-1657548465923-b518a6508e0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt=""
          />
          <h2>akjlasjdlkajf</h2>
        </div>
        <div className="cover_bot_item">
          <img
            src="https://images.unsplash.com/photo-1651055699023-36d26d793a21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt=""
          />
          <h2>akjlasjdlkajf</h2>
        </div>
      </div>
    </div>
  );
};

export default Mainbonus;
