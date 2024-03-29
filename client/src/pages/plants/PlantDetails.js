import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus, FaShippingFast } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";
import Testimonials from "../../components/Testimonials";
import AddToCartButton from "../../components/AddToCartButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Accordion, Table } from "react-bootstrap";

function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("clay");

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

  const notifySuccess = () =>
    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = (errorMsg) =>
    toast.error(`Something went wrong: ${errorMsg}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const getPlant = async (plantId) => {
    try {
      const { data } = await axios.get(
        `https://iaa78lddrb.execute-api.us-east-2.amazonaws.com/prod/plant?plantId=${plantId}`
      );
      setPlant(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getRecommended = async (currId) => {
    try {
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
    getRecommended(id);
  }, [id]);

  const plantItem = {
    plantId: plant.plantId,
    name: plant.name,
    imgUrl: plant.imgUrl,
    price: plant.price,
    quantity: quantity,
  };

  return (
    <div className="d-flex justify-content-center container mt-5">
      <div className="d-flex row plants-container">
        <img
          src={plant.imgUrl}
          alt={plant.name}
          id="plant-img"
          className="col-lg-6"
        />
        <div className="col-lg-6 info-container container">
          <div className="d-flex justify-content-between info-header align-items-end">
            <h3>{plant.name}</h3>
            <div>${plant.price}</div>
          </div>
          <div className="mb-4">{plant.description}</div>
          <div className="row mb-4 plant-chars">
            <div className="col-md-4">{plant.location}</div>
            <div className="col-md-4">{plant.care}</div>
            <div className="col-md-4">
              Stock:{" "}
              {plant.inventory ? (
                <span>item in stock</span>
              ) : (
                <span>item out of stock</span>
              )}
            </div>
          </div>
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
            <AddToCartButton
              item={plantItem}
              notifySuccess={notifySuccess}
              notifyError={notifyError}
            />
          </div>
        </div>
        <div className="col-lg-6 d-flex shipping-container mt-3 p-3">
          <div className="col-lg-6 d-flex row text-center justify-content-center m-0">
            <FaShippingFast className="shipping-icons" />
            <span>Free Shipping</span>
            <p className="ps-3 pe-3">
              Get free standard shipping when you spend $150 or more.
            </p>
          </div>
          <div className="col-lg-6 d-flex row text-center justify-content-center m-0">
            <BsPatchCheck className="shipping-icons" />
            <span>Guarantee</span>
            <p className="ms-3 ps-3 pe-3">
              If your plant dies within 30 days, we'll replace it for free.
            </p>
          </div>
        </div>
        {/* {plant.plant_detail && ( //error handling needs to be updated, and include loaders */}
        {plant && ( //error handling needs to be updated, and include loaders
          <>
            <div className="col-lg-6 mt-3">
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>DETAILS & CARE</Accordion.Header>
                  <Accordion.Body>
                    <Table>
                      <tbody>
                        <tr>
                          <td className="col-md-4 label">Size</td>
                          <td>{plant.size && plant.size.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <td className="label">Difficulty</td>
                          <td>{plant.care}</td>
                        </tr>
                        <tr>
                          <td className="label">Light</td>
                          <td className="capitalize">{plant.light}</td>
                        </tr>
                        <tr>
                          <td className="label">Pet Friendly</td>
                          <td>{plant.pet_friendly ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <td className="label">Air Cleaner</td>
                          <td>{plant.air_cleaner ? "Yes" : "No"}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>WHAT'S INCLUDED</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>
                        Healthy plant pre-potted with premium soil
                        <ul>
                          <li>Plant size: 44"-58" tall (including pot)</li>
                        </ul>
                      </li>
                      <li>
                        Ecopots pot and saucer
                        <ul>
                          <li>Round Pot: 12" diameter, 10" tall</li>
                          <li>Round Saucher: 10.5" diameter</li>
                        </ul>
                      </li>
                      <li>All the tips and tricks for expert-level care</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="d-flex mt-5 description-container">
              <div className="col-lg-6 p-5">
                <div className="p-2">
                  <h4>Description</h4>
                  <p className="pb-5 mb-5">{plant.full_description}</p>
                  <h4>Botanical Name</h4>
                  <i>{plant.botanical_name}</i>
                  <h4 className="mt-3">Common Name(s)</h4>
                  <p>{plant.common_name}</p>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  src={plant.img_detail}
                  alt={plant.name}
                  className="w-100 p-3"
                />
              </div>
            </div>
          </>
        )}
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
      <ToastContainer />
    </div>
  );
}

export default PlantDetails;
