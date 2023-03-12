import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import NavBar from "./components/Navbar";
import { useCookies } from "react-cookie";
import "./index.scss";
import Home from "./pages/home/Home";
import Plants from "./pages/plants/Plants";
import PlantDetails from "./pages/plants/PlantDetails";
import About from "./pages/about/About";
import User from "./pages/user/User";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
        // `http://localhost:8000/todos/${userEmail}`
      );
      console.log("RESPONSE", response);
      const json = await response.json();
      // console.log("JSON: ", json);
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  return (
    <div className="app flex-container">
      <div className="promo-banner text-center">
        <p>Free Shipping on Orders $150+</p>
      </div>
      {/* {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"🏝️ Holiday tick list"} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">© Bloom Marketplace</p> */}
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
        <NavBar auth={authToken}/>
        {/* {authToken && <Auth />} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plants/:id" element={<PlantDetails email={userEmail} />} email={userEmail} />
          <Route path="/about/*" element={<About />} />
          <Route path="/my-profile/*" element={<User auth={authToken} email={userEmail}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
