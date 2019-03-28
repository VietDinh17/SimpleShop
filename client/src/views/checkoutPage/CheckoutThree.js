import React from "react";
import {
  getCart,
  calculatePrice,
  clearCart,
  getUser,
  calculateAmount
} from "../../utils/SetGetDatabase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CartAlter from "./../cartPage/CartAlter";
//import CreditCardInput from "react-credit-card-input";

import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "https://d8fa3d59.ngrok.io";
const strapi = new Strapi(apiUrl);


class Checkout extends React.Component {
  state = {

    cartItems: [],
    cardNumber: 0,
    expiry: 0,
    cvc: 0
  };

  async componentDidMount() {
    this.setState({ cartItems: getCart(),
                 });
  }


  handleSubmit = async event => {
      
      const {cartItems } = this.state;
      
      
      event.preventDefault();
      try{     
          await strapi.createEntry('reciepts', {
              buyer: getUser()._id,
              description: cartItems
          });
      } catch (err) {
          console.error(err);
      }
      clearCart();
      window.location.reload();
  }

  handleChange = name => event => {

  }

  render() {
    const { cartItems, cardNumber, expiry,cvc } = this.state;
    console.log(cartItems);
    return (
      <div>
        <Grid>
          <Typography
            variant="h4"
            gutterBottom
            style={{ marginLeft: "5%", padding: "2%" }}
          >
            Checkout
          </Typography>
          <Divider />
          <CartAlter />
          <Divider />
          <Typography
            variant="h5"
            gutterBottom
            style={{ marginLeft: "7%", paddingTop: "2%" }}
          >
            Shipping Details
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={this.handleConfirmOrder}
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "7%" }}
          >
            <Grid item xs="12">
              <TextField
                id="address"
                label="Shipping Address"
                name="address"
                onChange={this.handleChange}
                margin="normal"
                disabled={cartItems.length === 0}
                style={{
                  width: 480
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
                  width: 240
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
                  width: 240
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
                  width: 360
                }}
              />
            </Grid>

            <Grid item xs="12">
              {/* <CreditCardInput
                cardNumberInputProps={{
                  value: cardNumber,
                  onChange: this.handleCardNumberChange
                }}
                cardExpiryInputProps={{
                  value: expiry,
                  onChange: this.handleCardExpiryChange
                }}
                cardCVCInputProps={{
                  value: cvc,
                  onChange: this.handleCardCVCChange
                }}
                fieldClassName="input"
              /> */}
            </Grid>

            <Grid item xs="12">
              <Button 
                onClick={this.handleSubmit}
                variant="contained"
                color="secondary"
                id="stripe__button"
                type="submit"
                style={{ marginBottom: "2%", marginTop: "10px" }}
              >
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
