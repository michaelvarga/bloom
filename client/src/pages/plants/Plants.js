import { useState, useEffect } from "react";
import './Plants.scss';

import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
// import { Link } from "react-router-dom";


function Plants() {
  const [plants, setPlants] = useState(null);

  const getPlants = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/plants`
      );
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
    <div>
      {plants?.map((plant) => (
        <div key={plant.id} className="plants-container">
          <div>
            <div>
              {/* <Link to={`/plants/${plant.id}`}> */}
                <img
                  src={plant.imgurl}
                  alt={plant.name}
                />
              {/* </Link> */}
            </div>

            <div>
              <h3>{plant.name}</h3>

              <div>
                <span>
                  {plant.location}
                </span>
                <span>|</span>
                <span>{plant.care}</span>
              </div>
              <p> {plant.description}</p>

              <div>
                <div>
                  <button
                    type="submit"
                    title="Save for Later"
                    onClick={() => {
                      alert(
                        `${plant.name} has been added to your saved for later`
                      );
                      // console.log(plant.id, userId);
                      // this.props.createLaterCartItem(plant.id, userId);
                    }}
                  >
                    {<FaRegHeart />}
                  </button>
                </div>
                <div>
                  <p>${plant.price}</p>
                  <button
                    type="submit"
                    title="Add To Cart"
                    // onClick={() => {
                    //   alert(`${plant.name} has been added to your cart`);
                    //   console.log(plant.id, userId);
                    //   this.props.createCartItem(plant.id, userId);
                    // }}
                  >
                    {<FaShoppingCart />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Plants;
