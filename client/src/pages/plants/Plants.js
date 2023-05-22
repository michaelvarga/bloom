import { useState, useEffect } from "react";
import axios from 'axios';
import "./plants.scss";

import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Plants() {
  const [plants, setPlants] = useState(null);
  const [awsPlants, setAwsPlants] = useState(null);

  const getPlants = async () => {
    try {
      const {data} = await axios.get("http://localhost:8080/api/plants");
      setPlants(data)
    } catch (error) {
      console.error(error);
    }
  };
  const getPlantsAWS = async () => {
    try {
      const {data} = await axios.get("database-1.co1ctmnxl6ev.us-east-2.rds.amazonaws.com/api/plants");
      setAwsPlants(data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-wrap plants-container">
        {awsPlants ? 'SUCCESS!' : 'FAIL!'}
        <h2>Shop All Plants</h2>
        {plants?.map((plant) => (
          <div className="col-12 col-md-6 col-lg-4" key={plant.id}>
            <Link to={`/plants/${plant.id}`} className='plant-link'>
              <div className="card">
                <img
                  src={plant.imgUrl}
                  alt={plant.name}
                  className="card-img-top"
                />
                <div className="card-body d-flex justify-content-between">
                  <h5 className="card-title">{plant.name}</h5>
                  <p>${plant.price}.00</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plants;
