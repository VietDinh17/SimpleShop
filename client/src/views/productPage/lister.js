import React, { Component } from "react";
import Slider from "react-slick";
import MediaCardTest from './MediaCardTest';

let cards = [
  {
  "image":"https://lh4.googleusercontent.com/proxy/EOT9r3kDA5dNa_K7eNADRQco6C8366O1ob5crEKVZPaf9p3029R0pEFeTKkR4SDD00P2ciNu4Fifp1wFYHhYTUOnwx6mJaohq2ww7aBtHot_AvgbfNWEgP3B=w440-h220-n-e365",
  "title":"Health & Beauty",
  },
  {
  "image":"https://lh6.googleusercontent.com/proxy/rabjrwF_0fFZGJoOsg5sGMdNlBeBcKw2xHF9jPuipfb1QqItWxWoauMvBeUTUL-I9jYqUIynmzmqAAresdE8Ur0oQTnnpZMooC1OKV4M1RRhbQB9cPo=w440-h220-n-e365",
  "title":"Electronics",
  },
  {
  "image":"https://lh6.googleusercontent.com/proxy/Rrh3tnw6ST8Xgnm7JvYdRJ7Wq58t36mF3PNR21X7R7PBfar3xCzz_3eph7OkCUWTocpbjcWDioSqL8xCYntnhJR4eJjyMeoLDlVNXtp1kwmH8Y5J8koYNc9sreg=w440-h220-n-e365",
  "title":"Home & Garden",
  },
  {
    "image":"https://lh6.googleusercontent.com/proxy/PjzKbRQ-VahyYAet5HaNZe01lpt6f0mS_nFtayHeD58EQtML1fstFNi64veRSMXctu8zkLEm4WgZxFvTLaJWUpml4oK5qGuCoWsQSe2fXRkKJItW=w440-h220-n-e365",
    "title":"Grocery",
  }
];

export default class Lister extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
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
          <MediaCardTest data={item} />
        </div>
      )
    })
    return (
      <div className="root">
        <div style={{ height: '20px' }}>
          <h2 style={{ margin: '50px' }} id="Heading">Shop by department</h2>
        </div>
        <div>
        <Slider {...settings}>
          {card}
        </Slider>
        </div>
      </div>
    );
  }
}
