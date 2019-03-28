import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ItemTable from './ItemTable';
import { Button, Typography } from '@material-ui/core';
import './History.css'


import { getUser } from "../../utils/SetGetDatabase"
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || "https://afternoon-peak-44756.herokuapp.com/";
const strapi = new Strapi(apiUrl);

export default class History extends React.Component {
    state = {
        isEmpty: false,
        receipts: []
    };


    async componentDidMount() {
        let response = await strapi.getEntry('users', getUser()._id);
        if(response !== undefined){
            this.setState({ receipts: response.reciepts});
            this.setState({ isEmpty: false});
        }else{
            this.setState({ isEmpty: true});
        }
    }

    render() {
    const { isEmpty, receipts } = this.state;

    let display;

    if(isEmpty){
        display = <div>
            <h1>You haven't bought anything yet.</h1>
            <h2>Check out what’s on your homepage or browse by department. </h2>
            </div>
    }else{
        display = receipts.map(function(receipt,index) {
            return(
              <div key={index} id="container">
                <Grid container   
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item>
                        <Typography variant="h5" >Date: {receipt.updatedAt.slice(0,10)}</Typography>
                    </Grid>
                    <Grid item>
                        <ItemTable data={receipt}/>
                    </Grid>
                </Grid>
              </div>
            )
          })
    }
    return (
        <div >
            {display}
        </div>
    );
  }
}

History.propTypes = {
  //classes: PropTypes.object.isRequired,
};

