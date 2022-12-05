import { useLocation } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
// import TrendingCoins from "../components/TrendingCoins"
import "./Home.css";
import Mainbonus from "../MainBonus/MainBonus";

const Home = () => {
  // const { state } = useLocation();
  // if (state === null) return null;
  // console.log(state);
  // console.log(location.state.email);

  return (
    <>
      <div className="homePage">
        <NavBar />
        <Mainbonus />
      </div>
    </>
  );
};

export default Home;
