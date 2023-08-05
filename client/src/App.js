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
  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = async () => {
    setShowCart(true);
  };


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
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
