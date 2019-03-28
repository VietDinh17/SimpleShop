import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home'
import MailIcon from '@material-ui/icons/Mail';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccessAlarms from '@material-ui/icons/AccessAlarms';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Drawer from '@material-ui/core/Drawer';
import NestedList from './NestedList';


import { getToken, clearToken, clearCart, setSearch } from "../utils/SetGetDatabase";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link:{
    color: "#FFF",
    '&:hover' : {
    color: "#FFF"
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    isLoggedIn: false,
    left: false,
    searchValue: "",
  };

  // async componentDidMount(){
  //   if(getToken() !== null)
  //     this.setState({ isLoggedIn: true });
  //     console.log(this.state.isLoggedIn)
  // }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleSignout = () => {
    this.handleMenuClose();
    this.setState({ isLoggedIn: false });
    clearToken();
    //clearCart();
    //this.props.;
    return <Redirect to='/search'/>
  };

  handleIcon = (name) => {
    if(name === 'Account'){
      return <AccountCircle />
    }else if(name === 'Cart'){
      return <ShoppingCart />
    }else if(name==='Home'){
      return <Home />
    }
    else return <AccessAlarms />
  };

  handleRoute = (name) => {
    if(name === 'Account'){
      if(getToken() !== null) return '/profile'
      else return '/signin'
    }else if(name === 'Cart')
      return '/cart'
    else if(name == 'Sale')
      return '/sale'
    else return '/'
  };

  handleChange = name => event => {
    event.persist();
    this.setState({
      [name]: event.target.value,
    });
  };



  handleSumbitSearch = (e) => {
    //return <Redirect to='/search'/>
    e.preventDefault();
    setSearch(this.state.searchValue);
    this.props.history.push('/search');
    //window.location.reload()
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, isLoggedIn } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



    const sideList = (
      <div className={classes.list}>
      <Typography component="h2" variant="display2" gutterBottom={false} align="center" style={{color: 'white',}}>
          Simple Shop
        </Typography>
        <Divider />
        <List disablePadding={true}>
          {['Home','Account', 'Cart', 'Sale'].map((text, index) => (
            <Link to={this.handleRoute(text)}>
            <ListItem button key={index} onClick={this.toggleDrawer('left', false)} >
              <ListItemIcon>{this.handleIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>
        <NestedList />
        <Divider />
        <List>
            <ListItem button key={'About us'} onClick={this.toggleDrawer('left', false)}>
              <ListItemIcon>
              <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={'About us'} />
            </ListItem>
        </List>
      </div>
    );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to='/profile'>
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={this.handleSignout}>Logout</MenuItem>

      </Menu>

    );

    let menuAcount;
    if(getToken() !== null){
      menuAcount =  <MenuItem onClick={this.handleProfileMenuOpen}>
                      <IconButton>
                        <AccountCircle />
                      </IconButton>
                    </MenuItem>
    }else{
      menuAcount =  <Link to = '/signin'>
                      <MenuItem>
                      <Typography>
                        Sign In
                      </Typography>
                      </MenuItem>
                    </Link>
    }

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <InfoIcon />
          </IconButton>
        </MenuItem>
        <Link to='/cart'>
        <MenuItem>
          <IconButton color="inherit">
            {/* <Badge className={classes.margin} badgeContent={} color="secondary">
              <NotificationsIcon />
            </Badge> */}
            <ShoppingCart />
          </IconButton>
        </MenuItem>
        </Link>
        {menuAcount}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              <Link to = '/' className={classes.link}>Simple Shop</Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSumbitSearch}>
              <Input
                placeholder="Search…"
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={this.handleChange('searchValue')}
              />
              </form>

            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <InfoIcon />
              </IconButton>
              <Link to='/cart' className={classes.link}>
              <IconButton color="inherit">
                {/* <Badge className={classes.margin} badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge> */}
                <ShoppingCart />
              </IconButton>
              </Link>
              {menuAcount}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}

        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"

            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));
