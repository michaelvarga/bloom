import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import NavBar from "./components/Navbar";
import { useCookies } from "react-cookie";
import "./index.scss";
import axios from "axios";
import Home from "./pages/home/Home";
import Plants from "./pages/plants/Plants";
import PlantDetails from "./pages/plants/PlantDetails";
import About from "./pages/about/About";
import User from "./pages/user/User";
import CartOffCanvas from "./components/CartOffCanvas";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = async () => {
    // await fetchCartData();
    setShowCart(true);
  };

  const getCart = async (sessionId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/cart_items/${sessionId}`
      );
      setCart(data);
      console.log("CART", data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSessionId = async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/shopping_sessions/${userId}/`
      );
      console.log("GOT SESSION ID");
      return data.id;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCartData = async () => {
    try {
      const seshId = await getSessionId(1); //UPDATE THIS
      await getCart(seshId);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div className="app flex-container">
      <div className="promo-banner text-center">
        <p>Free Shipping on Orders $150+</p>
      </div>
      {/* {!authToken && <Auth />}
      {authToken && (
        <>
        </>
      )}*/}
      <BrowserRouter>
        {/* <nav className="d-flex">
          <Link to="/" className="text-reset text-decoration-none">
            <h1>Bloom Marketplace</h1>
          </Link>
          <div>
            <Link to="/plants" className="text-reset text-decoration-none">Plants</Link>
            <Link to="/about" className="text-reset text-decoration-none">About</Link>
          </div>
          <div className="">
            <Link to="/my-profile" className="text-reset text-decoration-none">User</Link>
          </div>
        </nav> */}
        <NavBar auth={authToken} handleShowCart={handleShowCart} />
        {/* {authToken && <Auth />} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route
            path="/plants/:id"
            element={<PlantDetails />}
            email={userEmail}
          />
          <Route path="/about/*" element={<About />} />
          <Route
            path="/my-profile/*"
            element={<User auth={authToken} email={userEmail} />}
          />
        </Routes>
        <CartOffCanvas
          placement="end"
          name="Cart"
          handleClose={handleCloseCart}
          show={showCart}
          cart={cart}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
