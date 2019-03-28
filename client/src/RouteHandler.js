import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './views/homepage/HomePage';
import LoginPage from './views/loginPage/LoginPage';
import SignUpPage from './views/loginPage/SignUpPage';
import CartPage from './views/cartPage/CartPage';
import Products from './views/productPage/product';
import Profile from './views/userPage/Profile';
import Checkout from './views/checkoutPage/CheckoutThree';
import Search from './views/searchPage/searchPage';
import SalePage from './views/salePage/SalePage';


const RouteHandler = () =>(
    <main>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/signin' component={LoginPage}/>
            <Route path='/signup' component={SignUpPage}/>
            <Route path='/cart' component={CartPage}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/search' component={Search}/>
            <Route path='/sale' component={SalePage}/>
            <Route path='/:departmentId' component={Products} />
        </Switch>
    </main>
)

export default RouteHandler;
