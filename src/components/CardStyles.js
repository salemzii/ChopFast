import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        maxWidth: '100%',
      },
      media: {
        height: 0,
        paddingTop: '76.25%', // 16:9
        transition: "transform 250ms ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
      },
      cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
      },
}));