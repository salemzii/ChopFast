import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        backgroundColor: '#f2f4f3',
        textAlign: 'center',
        padding: '25px 50px'
    },
    footerLogo: {
      fontFamily: "Pacifico",
      fontSize: '35px',
      textDecoration: 'underline solid #e6d3a3',
      textUnderlineOffset: '0.3em',
      textDecorationThickness: '0.1em',
      paddingBottom: '1.5rem'
    },
    footerText: {
        paddingTop: '1em',
    },
    social: {
        margin: '0 0.5rem',
        transition: 'transform 250ms',
        display: 'inline-block',
        "&:hover": { transform: "translateY(-2px)" },
    },
}));