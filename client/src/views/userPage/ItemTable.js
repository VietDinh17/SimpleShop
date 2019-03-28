import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "https://2b743ae0.ngrok.io";
const strapi = new Strapi(apiUrl);

const TAX_RATE = 0.07;

const styles = theme => ({
  root: {
    width: '100%',
    //marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { id, desc, qty, unit, price };
}

function subtotal(items) {
  var total = 0;
  items.forEach(function(element) {
    if(typeof element !== 'undefined'){
    total += element.totalPrice*element.quantity;
  }
  });
  return total;
}
function subtotal1(items) {

  return items.map(({ price }) => price.totalPrice).reduce((sum, i) => sum + i, 0);
}



class ItemTable extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        data: props.data.description,
        items: []
      }
    }

    async componentDidMount(){

      console.log(this.state.data.description);
      //console.log(rows);
      const itemIDs = [];
        this.state.data.forEach( item => {
            itemIDs.push({"itemID" : item.itemID});

        })


      let it =  await Promise.all(itemIDs.map(async itemID => {
        const response = await strapi.getEntry('items', itemID.itemID);
        return response;
      }));

      this.setState({items: it});


    }
    render(){
        const { classes } = this.props;
        const { data, items } = this.state;
        const invoiceSubtotal = subtotal(data);
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;

        return (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell numeric>QTY</TableCell>
                  <TableCell numeric>Price</TableCell>
                  <TableCell numeric>Totoal Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row,index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{items._id === row.itemID}</TableCell>
                      <TableCell numeric>{row.quantity}</TableCell>
                      <TableCell numeric>{row.quantity}</TableCell>
                      {/* <TableCell numeric>{ccyFormat(row.totalPrice)}</TableCell> */}
                      <TableCell numeric>{row.totalPrice}</TableCell>

                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell numeric>{invoiceSubtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell numeric>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                  <TableCell numeric>{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Discount</TableCell>
                  <TableCell numeric>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                  <TableCell numeric>{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell numeric>{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        );
    }
}

ItemTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemTable);
