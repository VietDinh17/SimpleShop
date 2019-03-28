import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import RouteHandler from './RouteHandler';

class App extends Component {
    render(){

        return(
            <div>
                <Header />
                <div>
                    <RouteHandler />
                </div>
                {/* <div>
                    <Footer />
                </div> */}
            </div>
        )
    }
}

export default App;
