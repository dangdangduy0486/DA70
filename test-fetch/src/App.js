import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import CoinInfo from "./pages/CoinInfo/CoinInfo";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import Markets from "./pages/Markets/Markets";
import UserInfor from "./pages/UserInfo/UserInfor";
import Forgot from "./pages/Forgot/Forgot";
import UserCart from "./pages/UserCart/UserCart";
import UserBudget from "./pages/UserBudget/UserBudget";
import NewPassword from "./pages/NewPassword/NewPassword";
import ExchangeRates from "./components/ExchangeRates/ExchangeRates";
import Coverter from "./components/Converter/Converter";
import Funding from "./pages/Funding/Funding";
import UserManagement from "./components/UserManagement/UserManagement";
import Aboutus from "./pages/AboutUs/AboutUs";
import P2PTrading from "./pages/P2PTrading/P2PTrading";
import Request from "./pages/Request/Request";
import Exchanges from "./pages/Exchanges/Exchanges";
import NFT from "./pages/NFT/NFT";
import NFTList from "./pages/NFT/NFTList";
import Derivatives from "./pages/Exchanges/Derivatives";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";

import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<Forgot />} />

            <Route path="/aboutus" element={<Aboutus />} />

            <Route path="/" element={<Home />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/coins/:coinID" element={<CoinInfo />} />
            <Route path="/exchange" element={<ExchangeRates />} />
            <Route path="/converter" element={<Coverter />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/exchanges/derivatives" element={<Derivatives />} />
            <Route path="/nft" element={<NFTList />} />
            <Route
              path="/api/auth/verify/:id/:token"
              element={<EmailVerify />}
            />
            <Route
              path="/api/user/reset-password/:email"
              element={<NewPassword />}
            />
            {/* Protected Route */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/p2p-trading" element={<P2PTrading />} />
              <Route path="/user-info" element={<UserInfor />} />
              <Route path="/usercart" element={<UserCart />} />
              <Route path="/userbudget" element={<UserBudget />} />
              <Route path="/funding" element={<Funding />} />
              <Route path="/usermanage" element={<UserManagement />} />
              <Route path="/request" element={<Request />} />
            </Route>
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
