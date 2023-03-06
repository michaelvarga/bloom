import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PlantDetails() {
  const [plant, setPlant] = useState(null);
  const {id} = useParams();

  const getPlant = async (plantId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/plants/${plantId}`);
      const json = await response.json();
      setPlant(json[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPlant(id);
  }, []);

  return (
    <div>
      {plant.name}
      <img src={plant.imgurl} alt="" />
    </div>
  )
}

export default PlantDetails
