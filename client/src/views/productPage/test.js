import React from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import Slider from "react-slick";
import MediaCardTest from './MediaCardTest';
import Grid from '@material-ui/core/Grid';

import { calculatePrice, setCart, getCart } from "../../utils/SetGetDatabase";
const apiUrl = process.env.API_URL || "https://2b743ae0.ngrok.io";
const strapi = new Strapi(apiUrl);


class Testqu extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dept: [],
      dep: props.data,
      categories: [],
      Loading: 'false',
      products: [],
      cartItems: []
    }
  }

  async componentDidMount() {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query{
          	department (id:"${this.state.dep}"){
              name
              picture
              categories{
                name
                _id
                items{
                  _id
                  name
                  price
                  description
                  picture
                  description
                }
              }
            }
          }`
        }
      });
       // console.log(response)
      // console.log("hi");

      this.setState({
        dept: response.data.department,
        categories: response.data.department.categories,
        cartItems: getCart(),
        products: response.data.department.categories.items
      });
      //console.log(this.state.cartItems);
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
    const { dept,categories } = this.state;
    // console.log(dept.categories);
    var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const cat = categories;

    return(
      <div>
      <Grid container>

        <Grid item xs="0" md="6">
          <img src={dept.picture} style={{width:"100%", maxHeight:"210px", objectFit:"cover"}} />
        </Grid>
        <Grid item xs="12" md="6" style={{color:"white", backgroundColor:"orange"}}>
          <h1 style={{ margin: '75px', color:"white", backgroundColor:"orange" }} id="Heading">{dept.name}</h1>
        </Grid>
        </Grid>
        <div>
        {cat.map((c,index)=>(
          <div key={index}>
          <h2 style={{ margin: '50px',marginBottom: "10px" }} id="Heading">{c.name}</h2>
          <Slider {...settings}>
              {c.items.map((item,index) => (
                  <MediaCardTest data={item} key={index} handleChange={this.addToCart}/>
              ))}
          </Slider>
          </div>
        ))}
      </div>
      </div>
    )
}
}
export default Testqu;
