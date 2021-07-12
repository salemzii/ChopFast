import { Card, CardMedia, CardContent, Typography, CardActions, IconButton  } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './MenuCardStyles';

const MenuCards = ({ section }) => {
    const classes = useStyles();

    const style = {
        height: 75,
    };
    return (
        <div>
             <Card className={classes.root}>
          <CardMedia className={classes.media} image={section.url} title={section.name} style={style} />
            <CardContent>
              <div className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                  {section.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {section.price}
                </Typography>
              </div>
            </CardContent>
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Cart">
              <AddShoppingCart />
            </IconButton>
          </CardActions>
          </Card>
        </div>
    )
}

export default MenuCards;