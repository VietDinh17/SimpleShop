import React from 'react';
import Lister from './lister';
import Divider from '@material-ui/core/Divider';
import Testqu from './test.js'


class Products extends React.Component{
  // resolve line 19
  componentDidMount() {
    console.log(this.props.match.params.departmentId);
  }
    render(){
      const depId = this.props.match.params.departmentId;
        return(
            <div >
                <div style={{ marginTop: '0'}}>
                  {/*<Lister />*/}
                  <Testqu data={depId} />
                </div>
            </div>
        )
    }
}

export default Products;
