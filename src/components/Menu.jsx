import MenuCards from './MenuCards';
import { Grid } from '@material-ui/core';
import useStyles from './MenuStyles';
import Card1 from '../assets/cake.jpg'
import Card2 from '../assets/coffee.jpg';
import Card3 from '../assets/kimchi.jpg';
import Card4 from '../assets/pizza1.jpg';
import Card5 from '../assets/omellette.jpg'
import Card6 from '../assets/sausage.jpg';
import Card7 from '../assets/spharks.jpg';
import Card8 from '../assets/toast.jpg';
import Card9 from '../assets/watermelon.jpg'
import Card10 from '../assets/asparagus.jpg';
import Card11 from '../assets/bacon.jpg';
import Card12 from '../assets/cake.jpg';

const sections = [
  {
    name: 'Cake',
    url: `${Card1}`,
    id: 1,
    price: '$199'
  },
  {
    name: 'Coffee',
    url: `${Card2}`,
    id: 2,
    price: '$99'
  },
  {
    name: 'Fried Rice',
    url: `${Card3}`,
    id: 3,
    price: '$300'
  },
  {
    name: 'Pizza',
    url: `${Card4}`,
    id: 4,
    price: '$200'
  },
  {
    name: 'Omellette',
    url: `${Card5}`,
    id: 5,
    price: '$50'
  },
  {
    name: 'Sausage',
    url: `${Card6}`,
    id: 6,
    price: '$150'
  },
  {
    name: 'Sphagetti',
    url: `${Card7}`,
    id: 7,
    price: '$199'
  },
  {
    name: 'Toast',
    url: `${Card8}`,
    id: 8,
    price: '$120'
  },
  {
    name: 'Watermelon',
    url: `${Card9}`,
    id: 9,
    price: '$20'
  },
  {
    name: 'Asparagus',
    url: `${Card10}`,
    id: 10,
    price: '$250'
  },
  {
    name: 'Bacon',
    url: `${Card11}`,
    id: 11,
    price: '$350'
  },
  {
    name: 'Cake',
    url: `${Card12}`,
    id: 12,
    price: '$199'
  }
];
const Menu = () => {
  const classes = useStyles();
  
    return (
        <div>
        <main className={classes.content}>
        <h1 className={classes.menu}>Our Menu</h1>
       {/* <div className={classes.toolbar} /> */}
          <Grid container justify="center" spacing={2}>
            {sections.map((section) => (
              <Grid item key={section.id} xs={12} sm={6} md={4} lg={3}>
                <MenuCards section={section} />
              </Grid>
            ))}
          </Grid>
          </main>
        </div>
    )
}

export default Menu;