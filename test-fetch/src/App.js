import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart";
import Home from "./pages/Home/Home";
import CoinInfo from "./pages/CoinInfo/CoinInfo";
// import Mainbonus from "./pages/MainBonus/MainBonus";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import Markets from "./pages/Markets/Markets";
import Test from "./pages/Test";
import UserInfor from "./pages/UserInfo/UserInfor";
import Forgot from "./pages/Forgot/Forgot";
import UserCart from "./pages/UserCart/UserCart";
import UserBudget from "./pages/UserBudget/UserBudget";
import NewPassword from "./pages/NewPassword/NewPassword";
import ExchangeRates from "./components/ExchangeRates/ExchangeRates";
import Coverter from "./components/Converter/Converter";
import Charge from "./pages/Charge/Charge";
import UserManagement from "./components/UserManagement/UserManagement";
import Aboutus from "./pages/AboutUs/AboutUs";
import TradingToP from "./pages/TradingToP/TradingToP";
import Request from "./pages/Request/Request";
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
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/trading" element={<TradingToP />} />
            <Route
              path="/api/user/reset-password/:id"
              element={<NewPassword />}
            />
            <Route path="/user-info" element={<UserInfor />} />
            <Route path="/usercart" element={<UserCart />} />
            <Route path="/userbudget" element={<UserBudget />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/layout" element={<Layout />} /> */}
            <Route path="/coins/:coinID" element={<CoinInfo />} />
            <Route
              path="/api/auth/verify/:id/:token"
              element={<EmailVerify />}
            />
            <Route path="/exchange" element={<ExchangeRates />} />
            <Route path="/converter" element={<Coverter />} />
            <Route path="/charge" element={<Charge />} />
            <Route path="/usermanage" element={<UserManagement />} />
            <Route path="/request" element={<Request />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
