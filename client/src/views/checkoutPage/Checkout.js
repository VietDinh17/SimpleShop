import React from "react";
// prettier-ignore
import { Container, Box, Heading, Text, Modal, Spinner } from "gestalt";
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
import CartAlter from './../cartPage/CartAlter'

import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "https://afternoon-peak-44756.herokuapp.com/";
const strapi = new Strapi(apiUrl);

class _CheckoutForm extends React.Component {
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

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleConfirmOrder = async event => {
    event.preventDefault();

    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }

    this.setState({ modal: true });
  };

  handleSubmitOrder = async () => {
    const {
      cartItems,
      city,
      address,
      postalCode,
      confirmationEmailAddress
    } = this.state;

    const amount = calculateAmount(cartItems);
    // Process order
    this.setState({ orderProcessing: true });
    let token;
    try {
      const response = await this.props.stripe.createToken();
      token = response.token.id;
      await strapi.createEntry("orders", {
        amount,
        products: cartItems,
        city,
        postalCode,
        address,
        token
      });
      await strapi.request("POST", "/email", {
        data: {
          to: confirmationEmailAddress,
          subject: `Order Confirmation - Simple Shop${new Date(Date.now())}`,
          text: "Your order has been processed",
          html: `
          <p> Dear Customer,</p>
          <p>                your order has been processed.
          Expect your order to arrive in 2-3 shipping days</p>
          <p><strong>Shipping Address:</strong></p>
          <p>${address}</p>
          <p>${city}</p>
          <p>${postalCode}</p>
          <p><strong>Order:</strong></p>
          ${cartItems.map(item => {
            return `<p>${item.name} x ${item.quantity} - ${item.quantity * item.price}</p>`
          }
        ).join('')}
          <strong>Total =$ ${amount} </strong>
          `
        }
      });
      this.setState({ orderProcessing: false, modal: false });
      clearCart();
      this.showToast("Your order has been successfully submitted!", true);
    } catch (err) {
      this.setState({ orderProcessing: false, modal: false });
      this.showToast(err.message);
    }
  };

  isFormEmpty = ({ address, postalCode, city, confirmationEmailAddress }) => {
    return !address || !postalCode || !city || !confirmationEmailAddress;
  };

  showToast = (toastMessage, redirect = false) => {
    this.setState({ toast: true, toastMessage });
    setTimeout(
      () =>
        this.setState(
          { toast: false, toastMessage: "" },
          // if true passed to 'redirect' argument, redirect home
          () => redirect && this.props.history.push("/")
        ),
      2000
    );
  };

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

const CheckoutForm = withRouter(injectStripe(_CheckoutForm));

const Checkout = () => (
  <StripeProvider apiKey="pk_test_Tm3rrAD4kTXbMmK1wo4pNwTG">
    <Elements>
      <CheckoutForm />
    </Elements>
  </StripeProvider>
);

export default Checkout;
