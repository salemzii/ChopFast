import { useState } from 'react';
import useStyles from './ContactStyles';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Typography, Button, TextField, IconButton, useMediaQuery, Hidden } from '@material-ui/core';
import { Phone, Email, Send } from '@material-ui/icons';

const Contact = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneHelper, setPhoneHelper] = useState('');
    const [message, setMessage] = useState('');

    const onChange = e => {
        let valid;

        switch (e.target.id) {
            case 'email':
                setEmail(e.target.value)
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
                if (!valid) {
                    setEmailHelper('Invalid email')
                } else {
                    setEmailHelper('')
                }
                break;
            case 'phone':
                setPhone(e.target.value)
                valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e.target.value)
                if (!valid) {
                    setPhoneHelper('Invalid phone')
                } else {
                    setPhoneHelper('')
                }
                break;
            default:
                break;
        }
    }

    return (
    <>
      <Grid container direction='row'>
          <Grid 
            style={{marginBottom: matchesMD ? '3em' : 0, marginTop: matchesSM ? '1em' : matchesMD ? '3em' : 0}} 
            item 
            container 
            direction='column' 
            justify='center' 
            alignItems='center' 
            lg={5} 
            xl={4}
          >
            <Grid item>
                <Grid container direction='column'>
                <Grid item>
              <div className={classes.toolbarMargin} />
                  <Typography 
                    style={{paddingBottom: '0.6rem'}} variant='h5' align={matchesMD ? 'center' : undefined}>
                    Contact Us
                  </Typography>
              </Grid>
              <Grid item container>
                  <Grid item>
                      <IconButton 
                        style={{position: 'relative', right: '12px'}} 
                        className={classes.drawerIconContainer} 
                        disableRipple
                      >
                          <Phone style={{color: '#e6d3a3', marginRight: '0.5em'}} />
                          <Typography variant='body1' style={{
                            color: theme.palette.common.grey, 
                            fontSize: '0.6em', 
                            lineHeight: '0.1em'}}
                          >
                            <a 
                              href="tel:08034443333" 
                              style={{textDecoration: 'none', color: 'inherit'}}
                            >
                              (080) 3444-3333
                            </a>
                          </Typography>
                      </IconButton>
                  </Grid>
              </Grid>
              <Grid item container >
                  <Grid item>
                      <IconButton 
                        style={{position: 'relative', right: '12px', bottom: '20px'}} 
                        className={classes.drawerIconContainer} 
                        disableRipple
                      >
                          <Email style={{color: '#e6d3a3', marginRight: '0.5em'}} />
                          <Typography 
                            variant='body1' 
                            style={{color: theme.palette.common.grey, 
                            fontSize: '0.6em', 
                            lineHeight: '0.1em'}}>
                            <a 
                              href="mailto:chopfast@gmail.com" 
                              style={{textDecoration: 'none', color: 'inherit'}}
                            >
                              chopfast@gmail.com 
                            </a>
                          </Typography>
                      </IconButton>
                  </Grid>
              </Grid>
              <Grid item container direction='column' style={{maxWidth: '20em'}}>
                  <Grid item style={{marginBottom: '0.5em'}}>
                      <TextField 
                        label='Name' 
                        id='name' 
                        fullWidth
                        value={name} 
                        onChange={e => setName(e.target.value)}
                      />
                  </Grid>
                  <Grid item style={{marginBottom: '0.5em'}}>
                      <TextField 
                        label='Email' 
                        error={emailHelper.length !==0}
                        helperText={emailHelper}
                        id='email' 
                        fullWidth
                        value={email} 
                        onChange={onChange} 
                      />
                  </Grid>
                  <Grid item style={{marginBottom: '0.5em'}}>
                      <TextField 
                        label='Phone' 
                        error={phoneHelper.length !==0}
                        helperText={phoneHelper}
                        id='phone' 
                        fullWidth
                        value={phone} 
                        onChange={onChange}
                      />
                  </Grid>
              </Grid>
              <Grid item style={{maxWidth: '20em'}}>
              <TextField 
                  id='message' 
                  InputProps={{ disableUnderline: true }}
                  className={classes.message}
                  value={message}
                  multiline
                  fullWidth
                  rows={5}
                  onChange={e => setMessage(e.target.value)}
              />
              </Grid>
              <Grid item container justify='center' style={{marginTop: '1em'}}>
                  <Button 
                    disabled={name.length === 0 || 
                    message.length === 0 || 
                    email.length === 0 || 
                    phone.length === 0 || 
                    phoneHelper.length !==0 || 
                    emailHelper.length !== 0 }
                    variant='contained' 
                    className={classes.sendButton}>
                    Send Message
                    <Send style={{marginLeft: '0.5em'}} />
                  </Button>
              </Grid>
                </Grid>
            </Grid>
          </Grid>
          <Hidden xsDown>
          <Grid 
            item 
            container 
            direction={matchesMD ? 'column' : 'row'} 
            alignItems='center' 
            className={classes.background} 
            justify={matchesMD ? 'center' : undefined} 
            lg={7} 
            xl={8}
          >
          <div 
            className="headerContainer" 
            style={{marginLeft: matchesMD ? 0 : '3em',
            textAlign: matchesMD ? 'center' : 'inherit'}}
          >
          <Typography 
            align={matchesMD ? 'center' : undefined} 
            variant='h2'
            style={{fontFamily: 'Pacifico', fontSize: '3rem'}}
          >
            ChopFast
          </Typography>
          <Typography 
            align={matchesMD ? 'center' : undefined} 
            variant='body1' 
            style={{fontSize: '1.5rem', lineHeight: '2.5rem'}}
          >
            The best restaurant
          </Typography>
          <Grid container justify={matchesMD ? 'center' : undefined}>
          <Link to="/menu">
          <button> ORDER NOW </button>
          </Link>
          </Grid>
          </div>
          </Grid>
          </Hidden>
      </Grid>
    </>
    )
}

export default Contact;