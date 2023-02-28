import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.scss";
import plantsAtHome from "../images/plants-at-home.jpg";
import plantsCafe from "../images/plants-cafe.jpg";
import plantsReading from "../images/plants-reading.jpg";

function HomeCarousel() {
  return (
    <div className="home-carousel-container">
      <div className="carousel-message">
        <h1>
          Bringing the outdoors <em>inside</em>
        </h1>
        <p>
          Add greenery to any room with pet-friendly and light adaptable plants.
        </p>
        <Link to="/plants">
          <button className="mt-3">SHOP ALL PLANTS</button>
        </Link>
      </div>
      <Carousel className="home-carousel">
        <Carousel.Item>
          <img className="d-block w-100" src={plantsAtHome} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={plantsCafe} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={plantsReading}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
