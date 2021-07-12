import { createMuiTheme } from '@material-ui/core/styles';

const resYel = "#e6d3a3";
const resGrey = "#f2f4f3";

export default createMuiTheme({
    palette: {
        common: {
            white: `${resGrey}`,
            grey: `${resYel}`
        },
        primary: {
            main: `${resGrey}`
        },
        secondary: {
            main: `${resYel}`
        }
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none", 
            fontWeight: 400,
            fontSize: "1rem"
        },
        signIn: {
            fontFamily: "Pacifico",
            fontSize: "0.9rem",
            textTransform: "none",
            color: "black"
        },
    },
    overrides: {
        MuiInputLabel: {
            root: {
                color: resYel,
                fontSize: '1rem'
            },
        },
        MuiInput: {
            root: {
                color: 'black',
                fontWeight: 300
            },
            underline: {
                "&:before": {
                    borderBottom: `2px solid ${resYel}`
                },
                "&:after": {
                    borderBottom: `2px solid ${resYel}`
                },
                "&:hover:not($disabled):not($focused):not($error):before": {
                    borderBottom: `2px solid ${resYel}`
                }
            }
        }
    }
});