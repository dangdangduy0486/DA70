import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import CoinInfo from "./pages/CoinInfo";
import Mainbonus from "./pages/Mainbonus";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/markets" element={<Home />} />
            <Route path="/" element={<Mainbonus />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/coins/:coinID" element={<CoinInfo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
