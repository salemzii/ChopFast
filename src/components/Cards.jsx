import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import useStyles from './CardStyles.js';

const Cards = ({ section }) => {
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
                <Typography variant="h5" gutterBottom>
                  {section.price}
                </Typography>
              </div>
                <Typography variant="body2" color="textSecondary">
                  {section.des}
                </Typography>
            </CardContent>
          </Card>
        </div>
    )
}

export default Cards;