import React from 'react';
import CardItem from './CartItem';
import './CartPage.css';
import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { calculatePrice, setCart, getCart } from "../../utils/SetGetDatabase";

// // import Strapi from "strapi-sdk-javascript/build/main";
//
// const apiUrl = process.env.API_URL || "https://safe-reef-10574.herokuapp.com";
//
// const strapi = new Strapi(apiUrl);

// let cards = [
//     {
//     "imageUrl":"https://lh3.googleusercontent.com/proxy/BPo2DiXk3pCMHxAqnam0og2M4ELLBb9WmNXr7YWd5ziEbO6J_8pYoNgA118isQ-GPVSrwf92aJh-fCzaHCTDU2JNu6mTmf9hWzQDJJTzOH0gsyztJ2awio_APkKhGfUrMquPB8cav30fJZjCmNb8uEZHZk5X7WUmTJG-Pr2WqsJZ11kVPB4=s500-pd-e365-pc0xffffff",
//     "name":"Chrome",
//     "price":"35.00",
//     "quantity": "1"
//     },
//     {
//     "imageUrl":"https://lh3.googleusercontent.com/proxy/e9y6l20W4Ks8FVWNmpBLgSnvk9zGi-I9_TDV_xPMiLkG5mpL_WZBLfuo8gHSR6hQX0wv1AT9rwU_cxzUPCcyjYl_lpAA92nznnEQAaBlb2OsSBdhW-R9_W4O8QPZ21-DZ7TMZUnBqRAAWi9QPoUQPP-PTL9VyL-TSEZLUxvOt7eaqJ_h1PHtbMTTYJogYdeYrmODzELAz3avkYOw0SP1=s500-pd-e365-pc0xffffff",
//     "name":"Alexa",
//     "price":"119.00",
//     "quantity": "1"
//     },
//     {
//     "imageUrl":"https://lh3.googleusercontent.com/proxy/0ySOWmigIo-ET-baYa4setqJ3IMeh_14SSAMKS7VGLVI7Turioq2NRKtgZ8jznE3V_pOiAaeMWGb_EdaCg7Kg2T-uZMyL-3x2kloZzsSPSwzHXcQ5lduDwN4Q-9NWzvQJx2H3eLMzn-u0XI6-D8zkRcvfu7UjuCws4h7YScQtuIxdMc9otN7Yo0GlK-N3U09uysDnBpItQpo_BvZhEO3=s500-pd-e365-pc0xffffff",
//     "name":"Fan",
//     "price":"17.99",
//     "quantity": "1"
//     },
//     {
//     "imageUrl":"https://lh3.googleusercontent.com/proxy/hK5Lix7XyFUhKO0NGyesZ-Ni1MG6ePZS5Dp-ZuhBIlpReG-ylIrY2ln7k37mpmFQvBk6C99aBvBID54i-SpfjpgjNURddKmK3Au_AheBVtyxKUCA3GaOvKKcrmX-mctSj00uGTk2rvNOcfpEVl_Jhdi0EeJURoe5SYdYrVsJKCF7kNttrEG5_ux8XtJX_BQ9qZOndeDhgd8Uo_uc5NA=s500-pd-e365-pc0xffffff",
//     "name":"Microwave",
//     "price":"150.00",
//     "quantity": "1"
//     }
// ];


class CartPage extends React.Component{
    state = {
        cartItems: []
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
                <div>
                    <h1>Your Shopping Cart is empty. </h1>
                    <h2>Check out what’s on your homepage or browse by department. </h2>
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
                                <Typography variant="h3" >Cart</Typography>
                            </Grid>
                            <Grid item>
                                <Link to="/checkout">
                                <Button variant="contained" color="primary">
                                    GO TO CHECKOUT
                                </Button>
                                </Link>
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
                                <Link to="/checkout">
                                <Button variant="contained" color="primary">
                                    GO TO CHECKOUT
                                </Button>
                                </Link>
                            </Grid>
                        </Grid>
                </div>
                </div>
            }
            </div>
        )
    }
}

export default CartPage;
