import React from 'react';
import {Router, Route, Redirect} from "react-router-dom";

import './App.css';
import history from './history';
import authProvider from "./auth_provider";


import BoardScreen from './board_screen';
import IndexScreen from './index_screen';
import LoginScreen from './login_screen';
import RegisterScreen from './register_screen';
import TopNav from './top_nav';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authProvider.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);


const App = () => (
    <Router history={history}>
        <div id="mainApp">
            <TopNav />

            <Route path="/" exact component={IndexScreen} />
            <Route path="/login/" component={LoginScreen} />
            <Route path="/register/" component={RegisterScreen} />
            <PrivateRoute path="/board/" component={BoardScreen} />
        </div>
    </Router>
);

export default App;
