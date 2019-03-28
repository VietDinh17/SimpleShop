import React, { Component } from "react";
import Slider from "react-slick";
import MediaCard from './MediaCard';
import Typography from "@material-ui/core/Typography";
import './History.css'

import { getUser, setCart, getCart } from "../../utils/SetGetDatabase"
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "https://afternoon-peak-44756.herokuapp.com/";
const strapi = new Strapi(apiUrl);



let cards = [
  {
  "image":"/Pics/condiments.jpg",
  "title":"Condiments",
  },
  {
  "image":"/Pics/snacks.jpg",
  "title":"Snacks",
  },
  {
  "image":"/Pics/frozen.jpg",
  "title":"Frozen",
  },
  {
  "image":"/Pics/cannedFood.jpg",
  "title":"Canned Foods",
  },
  {
  "image":"/Pics/produce.jpg",
  "title":"Produce",
  },
  {
  "image":"/Pics/dairy.jpg",
  "title":"Dairy",
  },
  {
    "image":"/Pics/meat.jpg",
    "title":"Meat and Seafood",
  },
  {
  "image":"/Pics/beverages.jpg",
  "title":"Beverages",
  },
  {
  "image":"/Pics/alcohol.jpg",
  "title":"Wine and Alcohol",
  },
];

export default class QuickReorder extends Component {

  state = {
    isEmpty: false,
    items: [],
    cartItems: []
};

async componentDidMount() {
  let response = await strapi.getEntry('users', getUser()._id);

  if(response !== undefined){
      this.setState({ isEmpty: false});
  }else{
      this.setState({ isEmpty: true});
      return;
  }

  const itemIDs = [];
  response.reciepts.forEach(reciept => {

    reciept.description.forEach( item => {

        itemIDs.push({"itemID" : item.itemID});

    })
  })

  let it =  await Promise.all(itemIDs.map(async itemID => {
    const response = await strapi.getEntry('items', itemID.itemID);
    return response;
  }));

  this.setState({ items: it});
  this.setState({
    cartItems: getCart(),
  });
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

  render() {
    const { isEmpty, items} = this.state;

    var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
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
    let card = items.map((item,index) => {
      return(
        <div key={index}>
          <MediaCard data={item} handleChange={this.addToCart} />
        </div>
      )
    })
    return (
      <div >
        <div>
          <Typography variant="h2" style={{margin: "30px"}}>Quick reorder</Typography>
        </div>
        {!isEmpty &&
          <div>
          <Slider {...settings}>
            {card}
          </Slider>
          </div>
        }
        {!isEmpty &&
          <div>
            <Typography variant="h4" style={{margin: "30px"}}>You haven't bought anything yet.</Typography>
            <Typography variant="h4" style={{margin: "30px"}}>Check out what’s on your homepage or browse by department. </Typography>
          </div>
        }
      </div>
    );
  }
}
