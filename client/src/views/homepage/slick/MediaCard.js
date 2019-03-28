import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';


const styles = {
  card: {
    marginTop: "10%",
    maxWidth: "99%",
    marginLeft: "3%",
    marginRight: "3%"
  },
  media: {
    height: 240,
  },
};


class MediaCard extends React.Component {
  render(){
    const { classes } = this.props;
    let image = this.props.data.picture;
    let title = this.props.data.name;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title="Department"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" style={{marginBottom:"-1px"}}>
              {title}
            </Typography>
          </CardContent>
          </CardActionArea>
      </Card>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
