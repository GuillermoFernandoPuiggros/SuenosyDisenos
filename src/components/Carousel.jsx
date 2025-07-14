import { Carousel } from "react-bootstrap";
import "../styles/Carousel.css";

const images = [
  "/collage1.webp",
  "/collage2.webp",
  "/collage3.webp",
  "/collage4.webp",
  "/collage5.webp",
  "/collage6.webp",
  "/collage7.webp",
  "/collage8.webp",
  "/collage9.webp",
];

const ImageCarousel = () => {
  return (
    <Carousel>
      {images.map((src, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={src}
            alt={`Slide ${index + 1}`}
            style={{ height: "70vh", objectFit: "cover" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
