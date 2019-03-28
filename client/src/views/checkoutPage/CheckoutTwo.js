import React from "react";
// prettier-ignore
import { Container, Box,  Heading, Text, Modal, Spinner } from "gestalt";
import ToastMessage from "./ToastMessage";
import Mloader from './Mloader';
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import { getCart, calculatePrice, clearCart, calculateAmount } from "../../utils/SetGetDatabase";
import { withRouter } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import CartAlter from './../cartPage/CartAlter';


import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "https://afternoon-peak-44756.herokuapp.com/";
const strapi = new Strapi(apiUrl);


class Checkout extends React.Component {
  state = {
    cartItems: [],
    address: "",
    postalCode: "",
    city: "",
    confirmationEmailAddress: "",
    toast: false,
    toastMessage: "",
    orderProcessing: false,
    modal: false
  };



  componentDidMount() {
    this.setState({ cartItems: getCart() });
  }



  render() {
    // prettier-ignore
    const { toast, toastMessage, cartItems, modal, orderProcessing } = this.state;
    console.log(cartItems)
    return (
<div>

      <Grid>
          <Typography variant="h4"  gutterBottom style={{marginLeft:"5%", padding:"2%"}}>
            Checkout
          </Typography>
          <Divider />
          <CartAlter />
          <Divider />
          <Typography variant="h5"  gutterBottom style={{marginLeft:"7%", paddingTop:"2%"}}>
            Shipping Details
          </Typography>
          <form noValidate autoComplete="off" onSubmit={this.handleConfirmOrder} style={{   display: 'flex',
    flexWrap: 'wrap', marginLeft:"7%"}}>
      <Grid item xs="12">
              <TextField
                id="address"
                label="Shipping Address"
                name="address"
                onChange={this.handleChange}
                margin="normal"
                disabled={cartItems.length === 0}
                style={{
                  width: 480,
                }}
              />
        </Grid>
        <Grid item xs="12" md="6">
              <TextField
                id="postalCode"
                label="Postal Code"
                name="postalCode"
                onChange={this.handleChange}
                margin="normal"
                disabled={cartItems.length === 0}
                style={{
                  width: 240,
                }}
              />
          </Grid>
          <Grid item xs="12" md="6">
              <TextField
                id="city"
                label="City"
                name="city"
                onChange={this.handleChange}
                margin="normal"
                disabled={cartItems.length === 0}
                style={{
                  width: 240,
                }}
              />
            </Grid>
            <Grid item xs="12">
              <TextField
                id="confirmationEmailAddres"
                label="Confirmation Email"
                name="confirmationEmailAddres"
                onChange={this.handleChange}
                disabled={cartItems.length === 0}
                margin="normal"
                style={{
                  width: 360,
                }}
              />
            </Grid>
            <Grid item xs="12" sm="8" md="6" lg="4">
            <div style={{paddingTop:"10px", paddingBottom:"10px", paddingLeft:"5px", paddingRight:"5px", backgroundColor:"rgb(247, 249, 250)", marginTop:"5px"}}>
            <CardElement id="stripe__input" onReady={input => input.focus()} />
            </div>
            </Grid>
            <Grid item xs="12">
            <Button variant="contained" color="secondary" id="stripe__button" type="submit" style={{marginBottom:"2%", marginTop:"10px"}}>
              Submit
            </Button>
            </Grid>
            </form>
      </Grid>
    </div>
  );
  }
}


export default Checkout;
