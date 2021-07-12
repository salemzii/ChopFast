import { makeStyles } from '@material-ui/core/styles';
import background from '../assets/pizza.jpeg';

export default makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '-3em'
    },
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '39em',
        paddingBottom: '7em'
    },
    drawerIconContainer: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    message: {
        border: `2px solid ${theme.palette.common.grey}`,
        marginTop: '2em',
        borderRadius: 5
    },
    sendButton: {
        ...theme.typography.signIn,
        borderRadius: 50,
        height: 45,
        width: 245,
        fontSize: '1rem',
        backgroundColor: theme.palette.common.grey,
        "&:hover": {
            backgroundColor: '#e6d3a3'
        }
    }
}));