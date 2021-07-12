import Cards from './Cards';
import { Grid, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import BannerImage from "../assets/pizza.jpeg";
import './Homes.css';
import useStyles from './HomeStyles';
import Card1 from '../assets/cake.jpg'
import Card2 from '../assets/coffee.jpg';
import Card3 from '../assets/kimchi.jpg';
import Card4 from '../assets/pizza1.jpg';
import Testimonial from './Testimonial';

const sections = [
  {
    name: 'Cake',
    url: `${Card1}`,
    id: 1,
    des: 'sweet food made by baking a mixture of flour, eggs, sugar, perfectly moist and delicious, every time!',
    price: '$199'
  },
  {
    name: 'Coffee',
    url: `${Card2}`,
    id: 2,
    des: 'Combine the richness of chocolate milk with a hit of espresso and a whipped cream',
    price: '$99'
  },
  {
    name: 'Fried Rice',
    url: `${Card3}`,
    id: 3,
    des: 'Chinese-inspired fried rice recipe customizable with any of your favorite mix-ins',
    price: '$300'
  },
  {
    name: 'Pizza',
    url: `${Card4}`,
    id: 4,
    des: 'Round, flattened base of leavened wheat-based dough topped with tomatoes, cheese.',
    price: '$200'
  }
];

const Home = () => {
    const classes = useStyles();

    return (
      <>
      <div>
           <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> ChopFast </h1>
        <p>The best restaurant</p>
        <Link to="/menu">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
          <main className={classes.content}>
          <Typography className={classes.popu} variant='h5'><span className={classes.popular}>Popular</span> Dish</Typography>
       {/* <div className={classes.toolbar} /> */}
          <Grid container justify="center" spacing={2}>
            {sections.map((section) => (
              <Grid item key={section.id} xs={12} sm={6} md={4} lg={3}>
                <Cards section={section} />
              </Grid>
            ))}
          </Grid>
          <Testimonial />
          </main>
        </div>
        </>
    )
}

export default Home;


