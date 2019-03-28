import React from 'react';
import ItemCard from './ItemCard';
import Grid from '@material-ui/core/Grid';
import { getSearch, setCart, getCart } from "../../utils/SetGetDatabase";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);


class Search extends React.Component{

  state = {
    loadingBrands: false,
    searchterm: this.props,
    products: [],
    cartItems: []
  }


  async componentDidMount() {
    try {
      let searchterm = getSearch();
      const response = await strapi.request("POST", "/graphql", {

        data: {

          query: `query findItems($searchterm : String) {

            items (where: {

              name_contains: $searchterm

            })

            {

              name

              description

              brand

              price

              discount

              picture

            }

          }`,

          variables: {searchterm}

        }

      });

      this.setState({
        products: response.data.items,
        cartItems: getCart(),
        loadingBrands: false
      });

    } catch (err) {

      console.error(err);

      this.setState({ loadingBrands: false} );

    }
      // console.log(response)
      // this.setState({ items: response.data.items})
  }

  addToCart = (product) => {
    const alreadyInCart = this.state.cartItems.findIndex(
      item => item._id === product._id
    );

    if (alreadyInCart === -1) {
      const updatedItems = this.state.cartItems.concat({
        ...product,
        quantity: 1
      });
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
    } else {
      const updatedItems = [...this.state.cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
    }
    //console.log(this.state.cartItems)
  };


  render(){
    const { products } = this.state

    //console.log(items);
    return(
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" style={{margin:"10px"}}>
        {products.map((i,index)=>(
          <Grid item xs="12" sm="6" md="4" lg="3">
          <div key={index}>
            <ItemCard data={i} handleChange={this.addToCart}/>
          </div>
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Search;
