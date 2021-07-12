import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    menu: {
      textDecoration: 'underline solid #e6d3a3',
      textUnderlineOffset: '0.4em',
      textDecorationThickness: '0.1em',
      textAlign: 'center',
      paddingBottom: '1em'
    }
}));