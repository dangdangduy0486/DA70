import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import CoinInfo from "./pages/CoinInfo";
import Mainbonus from "./pages/Mainbonus";
import EmailVerify from "./pages/emailVerify/emailVerify ";
import Markets from "./pages/Markets";
import Test from "./pages/Test";
import UserInfor from "./pages/UserInfor";
import Forgot from "./pages/Forgot";
import UserCart from "./pages/UserCart";
import UserBudget from "./pages/UserBudget";
import NewPassword from "./pages/NewPassword";
import ExchangeRates from "./components/ExchangeRates";
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
            <Route path="/api/user/reset-password/:id" element={<NewPassword />} />
            <Route path="/userinfo" element={<UserInfor />} />
            <Route path="/usercart" element={<UserCart />} />
            <Route path="/userbudget" element={<UserBudget />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/" element={<Home />} />
            <Route path="/coins/:coinID" element={<CoinInfo />} />
            <Route
              path="/api/user/verify/:id/:token"
              element={<EmailVerify />}
            />
            {/*  */}
            <Route path="/exchange" element={<ExchangeRates />} />
            {/*  */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
