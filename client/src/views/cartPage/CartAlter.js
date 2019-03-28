import React from 'react';
import CardItem from './CartItemAlt';
import './CartAlter.css';
import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';


import { calculatePrice, setCart, getCart } from "../../utils/SetGetDatabase";



class CartAlter extends React.Component{
    state = {
        cartItems: [],
    }

   async componentDidMount(){
        this.setState({ cartItems: await getCart()})
   }


   deleteItemFromCart = (itemToDelete) => {
        const filteredItems = this.state.cartItems.filter(
            item => item._id !== itemToDelete._id
        );
        this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
    };

    render(){
        const { cartItems } = this.state;

        let display;


            display = cartItems.map((item,index) => {
                return(
                  <div key={index}>
                    <CardItem data={item} handleDelete={this.deleteItemFromCart} />
                  </div>
                )
              })


        return(
            <div className="root">
            {cartItems.length === 0 &&
                <div style={{marginLeft:"7%", marginBottom:"2%"}}>
                    <Typography variant="h5" >Your shopping cart is empty. </Typography>
                    <Typography variant="h5" >Check out what’s on your homepage or browse by department. </Typography>
                </div>}
            {cartItems.length !== 0 &&
                <div>
                <div id="container-fosc">
                        <Grid container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h5" >Cart Review</Typography>
                            </Grid>
                        </Grid>
                </div>
                <div className="itemBox" >
                    {display}
                </div>
                <div id="container-fosc" className="bottom">
                        <Grid container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            spacing={16}
                        >
                            <Grid item>
                                <Typography variant="title">Subtotal: </Typography>
                            </Grid>
                            <Grid item>
                            <Typography variant="title">{calculatePrice(cartItems)}</Typography>
                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                </div>
                </div>
            }
            </div>
        )
    }
}

export default CartAlter;
