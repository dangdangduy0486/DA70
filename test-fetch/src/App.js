import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import CoinInfo from "./pages/CoinInfo";
import Mainbonus from "./pages/Mainbonus";
import EmailVerify from "./pages/emailVerify/emailVerify ";

function App() {
  // const user = localStorage.getItem("token");
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            {/* {user && <Route path="/cart" exact element={<Cart />} />} */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/markets" element={<Home />} />
            <Route path="/" element={<Mainbonus />} />
            <Route path="/coins/:coinID" element={<CoinInfo />} />
            <Route path="/api/user/verify/:id/:token" element={<EmailVerify />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
