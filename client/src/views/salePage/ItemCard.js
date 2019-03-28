import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Button,Typography,CardActions} from '@material-ui/core';


const styles = {
  card: {
    marginTop: "10%",
    maxWidth: "99%",
    marginLeft: "3%",
    marginRight: "3%",
    maxHeight: '900'
  },
  media: {
    height: 360,
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover'
  },
};

class ItemCard extends React.Component {

  handleAddItem = () => {
    this.props.handleChange(this.props.data)
  }

  render(){

    const { classes } = this.props;
    let image = this.props.data.picture;
    let title = this.props.data.name;
    let price = this.props.data.price;
    let discountPercent = this.props.data.discount;
    let description = this.props.data.description;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title="Item"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" color="primary">
              {((1-discountPercent)*100).toFixed(0)}% OFF
            </Typography>
            <Typography style={{display: 'inline-block'}} gutterBottom variant="h6" component="h2">
              ${(price*discountPercent).toFixed(2)}
            </Typography>
            <Typography style={{display: 'inline-block'}} gutterBottom variant="subheading">
              <s>${price}</s>
            </Typography>
            <Typography component="p">
              {description}
            </Typography>
          </CardContent>
          </CardActionArea>
          <CardActions>
          <Button size="small" variant="contained" color="primary" onClick={this.handleAddItem}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    );
  }

}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard);
