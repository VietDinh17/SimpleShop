import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { calculatePrice, setCart, getCart } from "../../utils/SetGetDatabase";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
    width: '100%',
    padding: theme.spacing.unit*2,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: 100,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class CartItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      imageUrl : props.data.picture,
      name : props.data.name,
      price : props.data.price,
      quantity: props.data.quantity,
      cartItems: [],
    }
  }

  async componentDidMount(){
    this.setState({ cartItems: await getCart()})
  }

  handleChange = () => event => {
    this.setState({
      quantity : event.target.value,
    });
    if(event.target.value*1 <= 0){
      this.setState({
        quantity : 0,
      });
      this.handleClick()
    }
    else{
      const itemInCart = this.state.cartItems.findIndex(
        item => item._id === this.props.data._id
      );
      const updatedItems = [...this.state.cartItems];
      updatedItems[itemInCart].quantity = event.target.value*1;
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
    }

    console.log(event.target.value)
    console.log(getCart());
  };


  handleClick = () => {
    this.props.handleDelete(this.props.data)
  }

  render(){
    const { classes } = this.props;
    const { imageUrl, name, price, quantity } = this.state;

    return (
      <Paper className={classes.root}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={imageUrl} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">${price}</Typography>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <Grid container item xs direction="row" spacing={8}>
              <Grid item xs>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline">
                <Grid item>
                <Typography variant="subtitle1" style={{marginRight:"4px"}}>x {this.state.quantity}</Typography>
                </Grid>
                <Grid item>
                <Typography variant="subtitle1">${price*quantity}</Typography>
                </Grid>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

}

CartItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartItem);
