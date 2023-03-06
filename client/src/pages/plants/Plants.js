import { useState, useEffect } from "react";
import "./plants.scss";

import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Plants() {
  const [plants, setPlants] = useState(null);

  const getPlants = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/plants`);
      const json = await response.json();
      setPlants(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-wrap plants-container">
        <h2>Shop All Plants</h2>
        {plants?.map((plant) => (
          <div className="col-12 col-md-6 col-lg-4" key={plant.id}>
            <Link to={`/plants/${plant.id}`} className='plant-link'>
              <div className="card">
                <img
                  src={plant.imgurl}
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
