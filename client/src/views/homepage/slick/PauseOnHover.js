import React, { Component } from "react";
import Slider from "react-slick";
import MediaCard from './MediaCard';
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "https://2b743ae0.ngrok.io";
const strapi = new Strapi(apiUrl);



let cards = [
  {
  "image":"/Pics/beverages.jpg",
  "title":"Beverages",
  },
  {
  "image":"/Pics/cannedFood.jpg",
  "title":"Canned Foods",
  },
  {
  "image":"/Pics/dairy.jpg",
  "title":"Dairy",
  },
  {
  "image":"/Pics/frozen.jpg",
  "title":"Frozen",
  },
  {
    "image":"/Pics/meat.jpg",
    "title":"Meat and Seafood",
  },
  {
  "image":"/Pics/produce.jpg",
  "title":"Produce",
  },
  {
  "image":"/Pics/snacks.jpg",
  "title":"Snacks",
  },
  {
  "image":"/Pics/alcohol.jpg",
  "title":"Wine and Alcohol",
  },
];


export default class PauseOnHover extends Component {
  state ={
    departments: [],
  }

  async componentDidMount() {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query{
          	departments{
              _id
              name
              picture
            }
          }`
        }
      });
      this.setState({ departments: response.data.departments})
  }
  render() {
    const { departments } = this.state;
    var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4500,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
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
    let card = cards.map(function(item,index) {
      return(
        <div key={index}>
          <MediaCard data={item} />
        </div>
      )
    })
    return (
      <div>
        <div >
          <Typography variant="h4" style={{margin: "40px", marginBottom: "-15px"}}>Shop by department</Typography>
        </div>
        <div>
        <Slider {...settings}>
          {departments.map((department,index) => (
            <Link to={department._id} key={index}>
              <MediaCard data={department} />

            </Link>
          ))}
        </Slider>
        </div>
      </div>
    );
  }
}
