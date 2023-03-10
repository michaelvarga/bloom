import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import CartOffCanvas from "../../components/CartOffCanvas";
import Testimonials from "../../components/Testimonials";
import { Link } from "react-router-dom";
import axios from "axios";

function PlantDetails({ email }) {
  const { id } = useParams();
  const [plant, setPlant] = useState({});
  const [cart, setCart] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("clay");
  // const [showCart, setShowCart] = useState(false);
  const [showCart, setShowCart] = useState(true);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setColor(value);
  };

  const createCartItem = async (userId) => {
    // create shopping session if doesnt exist
    // add cart item to shopping session
    try {
      const session = await axios.post(
        `http://localhost:8080/api/shopping_sessions/${userId}/`
      );

      let sessionId = session.data.id;
      const item = {
        plantId: id,
        shoppingSessionId: sessionId,
        userId: userId,
        purchasePrice: plant.price,
        quantity: quantity,
        color: color,
      };

      const { data: created } = await axios.post(
        `http://localhost:8080/api/cart_items`,
        item
      );
      console.log("CART ITEM", created);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = () => {
    console.log(color, quantity);
    handleShowCart();
    createCartItem(1); // UPDATE THIS
    getCart(1); //UPDATE THIS
  };

  const getPlant = async (plantId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/plants/${plantId}`
      );
      setPlant(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCart = async (sessionId) => {
    try {
      const {data} = await axios.get(`http://localhost:8080/api/cart_items/${sessionId}`);
      setCart(data)
      console.log("CART", data)
    } catch (err) {
      console.error(err)
    }
  }

  const getRecommended = async (currId) => {
    try {
      // const response = await fetch(`${process.env.REACT_APP_SERVERURL}/plants/`)
      //   .then((res) => res.json()).then(data => data.filter(obj => obj.id !== currId));
      axios.get(`http://localhost:8080/api/plants`).then((response) => {
        const plants = response.data
          .filter((plant) => plant.id !== currId)
          .slice(0, 4);
        setRecommended(plants);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPlant(id);
    getCart(1); //UPDATE THIS
    getRecommended(id);
  }, [id]);

  return (
    <div className="d-flex justify-content-center container mt-5">
      <CartOffCanvas
        placement="end"
        name="Cart"
        handleClose={handleCloseCart}
        show={showCart}
        cart={cart}
      />
      <div className="d-flex row plants-container">
        <img
          src={plant.imgUrl}
          alt={plant.name}
          id="plant-img"
          className="col-lg-6"
        />
        <div className="col-lg-6 info-container">
          <div className="d-flex justify-content-between info-header align-items-end">
            <h3>{plant.name}</h3>
            <div>${plant.price}</div>
          </div>

          <p>Emaill: {email}</p>
          <p>{plant.description}</p>

          <p>{plant.location}</p>
          <p>{plant.care}</p>
          <p>
            Stock:{" "}
            {plant.inventory ? (
              <span>item in stock</span>
            ) : (
              <span>item out of stock</span>
            )}
          </p>
          <div className="color-container">
            <h4>Choose a pot color</h4>
            <div className="d-flex colors">
              <div className="form-check form-check-inline color">
                <input
                  type="radio"
                  className="form-check-input"
                  name="color"
                  id="stone"
                  onChange={handleChange}
                />
              </div>
              <div className="form-check form-check-inline color">
                <input
                  type="radio"
                  className="form-check-input"
                  name="color"
                  value="clay"
                  id="clay"
                  onChange={handleChange}
                />
              </div>
              <div className="form-check form-check-inline color">
                <input
                  type="radio"
                  className="form-check-input"
                  name="color"
                  value="black"
                  id="black"
                  onChange={handleChange}
                />
              </div>
              <div className="form-check form-check-inline color">
                <input
                  type="radio"
                  className="form-check-input"
                  name="color"
                  value="slate"
                  id="slate"
                  onChange={handleChange}
                />
              </div>
              <div className="form-check form-check-inline color">
                <input
                  type="radio"
                  className="form-check-input"
                  name="color"
                  value="indigo"
                  id="indigo"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="plant-buttons mt-5 d-flex">
            <div className="quantity-btn d-flex justify-content-center align-items-center">
              <button onClick={handleDecrement}>
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>
                <FaPlus />
              </button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="d-flex row justify-content-center">
          <h3 className="mt-5 mb-3 text-center">
            We Make Houseplants <i>Easy</i>
          </h3>
          <p className="col-lg-8">
            Are you interested in adding some greenery to your surroundings? Our
            plants are cultivated in our own greenhouses and dispatched straight
            to your doorstep, ensuring their good health and exceptional
            condition upon arrival. Unlike plants found in department stores or
            retailers, our plants are nurtured in pots that facilitate healthy
            root growth and drainage, which makes it easier for you to keep them
            well-watered. Additionally, we use an advanced shipping box that
            regulates temperature and safeguards the plant during
            transportation, so it comes to you all set to freshen up your space.
            With Bloom Marketplace, you can forego the inconvenience of
            purchasing a separate pot and soil and repotting the plant. Place
            your order now and experience the attractiveness and advantages of
            indoor plants in your home!
          </p>
        </div>
        <div className="recommended-plants fluid-container d-flex row justify-content-center">
          <h3 className="mt-5 mb-3">People Also Browsed</h3>
          <div className="row mb-5">
            {recommended.map((plant) => (
              <div key={plant.id} className="col-md-3">
                <a className="plant-link" href={`/plants/${plant.id}`}>
                  <div className="card">
                    <img
                      src={plant.imgUrl}
                      alt={plant.name}
                      className="card-img-top"
                    />
                    <div className="card-body d-flex justify-content-between">
                      <h5 className="card-title">{plant.name}</h5>
                      <p>${plant.price}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <Testimonials />
      </div>
    </div>
  );
}

export default PlantDetails;
