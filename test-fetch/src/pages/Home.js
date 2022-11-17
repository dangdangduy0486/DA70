import NavBar from "../components/NavBar";
// import TrendingCoins from "../components/TrendingCoins"
import "../Css/home.css";
import Mainbonus from "./Mainbonus";

const Home = () => {
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
