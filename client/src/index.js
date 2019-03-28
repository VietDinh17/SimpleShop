import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss";
import "./assets/demo/demo.css";

ReactDOM.render((
     <BrowserRouter>
        <App />
     </BrowserRouter>
), document.getElementById('app'))
