import React from 'react';
import {Router, Route, Redirect} from "react-router-dom";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from "react-dnd";

import './App.css';
import history from './history';
import authProvider from "./auth_provider";


import BoardScreen from './board_screen';
import IndexScreen from './index_screen';
import LoginScreen from './login_screen';
import RegisterScreen from './register_screen';
import TopNav from './top_nav';

import './polyfill';
import "jspolyfill-array.prototype.findIndex";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authProvider.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);


const App = () => (
    <DragDropContextProvider backend={HTML5Backend}>

    <Router history={history}>
        <div id="mainApp">
            <TopNav />

            <Route path="/" exact component={IndexScreen} />
            <Route path="/login/" component={LoginScreen} />
            <Route path="/register/" component={RegisterScreen} />
            <PrivateRoute path="/board/" component={BoardScreen} />
        </div>
    </Router>
    </DragDropContextProvider>
);

export default App;
