import ImageCarousel from "../components/Carousel";
import "../styles/Home.css";
import { Container } from "react-bootstrap";


const Home = () => {
  return (
    <div className="home-wrapper">
      <h1 className="home-title">¡Haz realidad tus Sueños y tus Diseños!</h1>
      <Container className="image-grid">
        <ImageCarousel />
      </Container>
    </div>
  );
};

export default Home;
