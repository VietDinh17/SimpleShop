import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  state = {
    intro: true,

  };

  handleClick = () => {
    this.setState(state => ({ intro: !state.intro }));
  };
  handleAfter = () => {
    //window.location.reload()
  }

  handleRoute = (name) =>{
    // this.setState(state => ({ dummy: !state.dummy }));

    if(name === 'Beverages'){
      //this.forceUpdate()
      return '/5bdbfadf82729c00165e57e8'
    }
    //else if (name === 'Snacks') return '/5bdbfae982729c00165e57e9'
    else if (name === 'Produce') return '/5bdbfb6382729c00165e57ec'
    else if (name === 'Canned Foods') return '/5be2883cd55e4e0016b7c1da'
    else if (name === 'Frozen') return '/5bdbfb5582729c00165e57eb'
    else if (name === 'Dairy') return '/5bdbfb6e82729c00165e57ed'
    else if (name === 'Meats') return '/5bdbfac982729c00165e57e6'
    else return  '/5bdbfad582729c00165e57e7'
  };

  render() {
    const { classes } = this.props;
    const routes = ['5bdbfadf82729c00165e57e8','5be2883cd55e4e0016b7c1da','5bdbfb6e82729c00165e57ed','5bdbfb5582729c00165e57eb','5bdbfac982729c00165e57e6', '5bdbfb6382729c00165e57ec','5bdbfad582729c00165e57e7']

    return (
      <div className={classes.root}>
        <List component="nav" disablePadding={true}>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Departments" />
            {this.state.intro ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.intro} timeout="auto" unmountOnExit>
            <List component="div" disablePadding={true}>
              {['Beverages','Canned Foods','Dairy', 'Frozen','Meat & Seafood','Produce','Wine & Alcohol'].map((text, index) => (
                <Link to={this.handleRoute(text)}>
                <ListItem onClick={this.handleAfter} button key={index} >
                  <ListItemText inset primary={text} />
                </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
