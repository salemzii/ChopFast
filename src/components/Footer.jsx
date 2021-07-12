import useStyles from './FooterStyles';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const classes = useStyles();
    let date = new Date().getFullYear();

    return (
        <>
        <div className={classes.root}>
        <Typography className={classes.footerLogo} variant='h5'>Chopfast</Typography>
           <div>
           <a href="https://www.youtube.com" className={classes.social} style={{color: '#eb3223'}}>
               <FontAwesomeIcon icon={faYoutube} size="2x" />
           </a>
           <a href="https://www.facebook.com" className={classes.social} style={{color: '#4968ad'}}>
               <FontAwesomeIcon icon={faFacebook} size="2x" />
           </a>
           <a href="https://www.twitter.com" className={classes.social} style={{color: '#49a1eb'}}>
               <FontAwesomeIcon icon={faTwitter} size="2x" />
           </a>
           <a href="https://www.instagram.com" className={classes.social} style={{color: '#000000'}}>
               <FontAwesomeIcon icon={faInstagram} size="2x" />
           </a>
           </div>
            <Typography className={classes.footerText}>Copyright  &copy; {`${date} chopfast`}</Typography>
        </div>
        </>
    )
}

export default Footer;