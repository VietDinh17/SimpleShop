import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class SortController extends React.Component {
  state = {
    option: '',
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      //resolve ui bug
      <Grid container spacing={24}>
      <Grid  xs="7" sm="8" md="9" lg="10">
      
      </Grid>
      <Grid  xs="5" sm="4" md="3" lg="2" style={{marginBottom:"10px", marginTop:"-3%"}}>
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Sort</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.option}
            onChange={this.handleChange}
            inputProps={{
              name: 'option',
              id: 'demo-controlled-open-select',
            }}
          >
            <MenuItem >None</MenuItem>
            <MenuItem value={10}>Relevance</MenuItem>
            <MenuItem value={20}>Price: low to high</MenuItem>
            <MenuItem value={30}>Price: high to low</MenuItem>
          </Select>
        </FormControl>
      </form>
      </Grid>
      </Grid>
    );
  }
}

SortController.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortController);
