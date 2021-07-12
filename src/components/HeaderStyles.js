import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    header: {
        fontFamily: "Pacifico",
        fontSize: '35px',
        "&:hover": {
            backgroundColor: "transparent"
        },
        textTransform: 'capitalize',
    },
    tabContainer: {
        marginLeft: "auto"  //pushes all the tabs to the right
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 1, //it squeezes all the tabs bar removing extra spaces
        marginLeft: "25px"   //gives the tabs little spaces btw them
    },
    button: {
        ...theme.typography.signIn,
        borderRadius: "50px",
        marginLeft: "40px",
        marginRight: "20px",
        height: "40px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    active: {
        textDecoration: 'underline solid #e6d3a3',
        textUnderlineOffset: '0.5em',
        textDecorationThickness: '0.2em'
    },
    drawerIcon: {
        height: "32px",
        width: "35px"
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawer: {
        width: 200
    },
    register: {
        backgroundColor: '#e6d3a3',
        fontFamily: "Pacifico",
        "&:hover": {
            backgroundColor: '#e6d3a3'
        }
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "black"
    },
    cart: {
        paddingTop: '10px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    cartIcon: {
        fontSize: '35px',
        [theme.breakpoints.down("xs")]: {
        fontSize: '26px',
        } 
    },
}));