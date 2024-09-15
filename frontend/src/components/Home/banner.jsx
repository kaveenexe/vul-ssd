import Carousel from 'react-bootstrap/Carousel';
import banner1 from "../../images/homeb1.jpg";
import banner2 from "../../images/homeb2.jpg";

function HomeBanner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to HerbBart</h3>
          <p>Nature's healing in every herb - Shop our selection today!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Welcome to HerbMart</h3>
          <p>Nature's healing in every herb - Shop our selection today!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanner;