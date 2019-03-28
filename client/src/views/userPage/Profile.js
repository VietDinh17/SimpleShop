import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import HistoryIcon from '@material-ui/icons/History';
import Infor from './Infor';
import History from './History';
import QuickReorder from './QuickReorder';



const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  space:{
    paddingTop: '2%'
  }
});


class Profile extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Information" icon={<PersonPinIcon/>}/>
            <Tab label="History" icon={<HistoryIcon/>} />
            <Tab label="Quick Reorder" icon={<ShoppingBasket/>}/>
          </Tabs>
        </AppBar>
        <div className={classes.space}>
          {value === 0 && <Infor/>}
          {value === 1 && <History/>}
          {value === 2 && <QuickReorder/>}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
