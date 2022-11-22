import NavBar from "../components/NavBar";
import RequestReceipt from "../components/RequestReceipt";
import "../Css/userCart.css";
const UserCart = () => {
  return (
    <>
      <NavBar />
      <section className="userCart">
        <RequestReceipt />
      </section>
    </>
  );
};

export default UserCart;
