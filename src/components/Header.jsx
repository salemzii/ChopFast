import { useState } from 'react';
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Fab, Zoom, Button, Tabs, Tab, IconButton,
         List,ListItem, ListItemText, SwipeableDrawer, useMediaQuery, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import useStyles from './HeaderStyles';

const ScrollTop = (props) => {
    const { children } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  
    if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }

const Header = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const tabs = (
      <>
         <Tabs className={classes.tabContainer}>
          <Tab
            className={classNames(location.pathname === '/' ? classes.active : undefined, classes.tab)} 
            component={Link} 
            to="/" 
            label="Home" 
          />
          <Tab 
            className={classNames(location.pathname === '/menu' ? classes.active : undefined, classes.tab)} 
            component={Link} 
            to="/menu" 
            label="Menu" 
          />
          <Tab 
            className={classNames(location.pathname === '/reservation' ? classes.active : undefined, classes.tab)}
            component={Link} 
            to="/reservation" 
            label="Reservation" 
          />
          <Tab 
            className={classNames(location.pathname === '/contact' ? classes.active : undefined, classes.tab)}
            component={Link} 
            to="/contact" 
            label="Contact" 
          />
          </Tabs>
          <Button 
            component={Link} 
            to="/register" 
            variant="contained" 
            color="secondary" 
            className={classNames(location.pathname === '/register' ? classes.activea : undefined, classes.button)}
          >
          Sign In 
          </Button>
      </>
    )

    const drawer = (
      <>
        <IconButton 
                className={classes.drawerIconContainer}
                disableRipple
                edge="start" 
                aria-label="open drawer" 
                onClick={() => setOpenDrawer(true)}
              >
              <MenuIcon className={classes.drawerIcon} />
              </IconButton>
              <SwipeableDrawer 
                className={classes.drawer} 
                open={openDrawer}
                onOpen={() => setOpenDrawer(true)}
                onClose={() => setOpenDrawer(false)}
                classes={{ paper: classes.drawer }}
              >
              <div className={classes.toolbarMargin} />
          <List disablePadding>
            <ListItem 
              onClick={() => setOpenDrawer(false)}  
              button 
              divider
              component={Link} 
              to="/"
              className={location.pathname === '/' ? classes.active : null}
            >
              <ListItemText 
                disableTypography 
                className={classes.drawerItem}>
                Home
              </ListItemText>
            </ListItem>
            <ListItem 
              onClick={() => setOpenDrawer(false)}
              divider 
              button 
              component={Link} 
              to="/menu"
              className={location.pathname === '/menu' ? classes.active : null}
            >
              <ListItemText 
                disableTypography 
                className={classes.drawerItem}>
                Menu
              </ListItemText>
            </ListItem>
            <ListItem 
              onClick={() => setOpenDrawer(false)}
              divider 
              button 
              component={Link} 
              to="/reservation"
              className={location.pathname === '/reservation' ? classes.active : null}
            >
              <ListItemText 
                disableTypography 
                className={classes.drawerItem}>
                Reservation
              </ListItemText>
            </ListItem>
            <ListItem 
              onClick={() => setOpenDrawer(false)}
              divider 
              button 
              component={Link} 
              to="/contact"
              className={location.pathname === '/contact' ? classes.active : null}
            >
              <ListItemText 
                disableTypography 
                className={classes.drawerItem}>
                Contact
              </ListItemText>
            </ListItem>
            <ListItem 
              onClick={() => setOpenDrawer(false)}
              divider 
              button 
              component={Link} 
              to="/register"
              className={location.pathname === '/register' ? classes.active : null}
              classes={{root: classes.register}}
            >
              <ListItemText 
                disableTypography 
                className={classes.drawerItem}>
                Sign In
              </ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>  
      </>
    )

    return (
        <>
        <div className={classes.roots}>
          <CssBaseline />
          <AppBar>
            <Toolbar>
            <div>
              <Button 
                component={Link} 
                to='/' 
                className={classNames(location.pathname === '/' ? classes.activee : null, classes.header)}
                disableRipple
              >
                Chopfast
              </Button>
            </div>
          {matches ? drawer  : tabs}
          <IconButton 
                disableRipple
                component={Link} 
                to='/cart'
                aria-label="show 1 new item" 
                color="inherit"
                className={classes.cart}
              >
                <Badge  badgeContent={1} color="secondary">
                  <ShoppingCartIcon className={classes.cartIcon} />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>  
          <Toolbar id="back-to-top-anchor" />
          <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
          </ScrollTop>
          </div> 
        </>
    )
}

export default Header;