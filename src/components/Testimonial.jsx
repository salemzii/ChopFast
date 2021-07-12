import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Girl from '../assets/girl.jpg';
import Girl1 from '../assets/girl1.jpg';
import Girl2 from '../assets/girl2.jpg';


const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "#e6d3a3", fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "#e6d3a3", fontSize: "30px" }} />
    </div>
  );
};
const Testimonial = () => {
  return (
    <div
      className="testimonial"
      style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
    >
      <div style={{ width: "50%", textAlign: "center" }}>
        <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />}>
          <Card img={Girl} />
          <Card img={Girl1} />
          <Card img={Girl2} />
        </Slider>
      </div>
    </div>
  );
};

const Card = ({ img }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "gray",
      }}
    >
      <Avatar
        imgProps={{ style: { borderRadius: "50%" } }}
        src={img}
        style={{
          width: 120,
          height: 120,
          border: "1px solid lightgray",
          padding: 7,
          marginBottom: 20,
        }}
      />
      <p>
      My favorite thing in life is time spent around the table. 
      And all the better with some seriously tasty food to bring us all together,you can't go 
      wrong with chopfast, Simply the best.
      </p>
      <p style={{ fontStyle: "italic", marginTop: 20 }}>
        <span style={{ fontWeight: 400, color: "#e6d3a3" }}>PAULA WILSON</span> ,
        Media Analyst
      </p>
    </div>
  );
};

export default Testimonial;