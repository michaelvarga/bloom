import { useState, useEffect } from "react";

function AllPlants() {
  const [plants, setPlants] = useState(null);

  const getPlants = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/plants`
        // `http://localhost:8000/todos/${userEmail}`
      );
      // console.log("RESPONSE", response);
      const json = await response.json();
      // console.log("JSON: ", json);
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
      {/* {plants && console.log(plants[0].name)} */}
      {plants?.map((plant) => (<div key={plant.id}>{plant.name}</div>))}
    </div>
  );
}

export default AllPlants;
