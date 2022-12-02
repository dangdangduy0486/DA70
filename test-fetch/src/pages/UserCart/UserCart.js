import NavBar from "../../components/NavBar/NavBar";
import RequestReceipt from "../../components/RequestReceipt/RequestReceipt";
import "./UserCart.css";
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
