import React, { Component } from 'react';
import {Router, Route, Link, Redirect} from "react-router-dom";
import './App.css';
import history from './history';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt, faThLarge } from '@fortawesome/free-solid-svg-icons'

class LoginScreen extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            error: null
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        fakeAuth.authenticate(() => {
            history.push('/');
        });
    }

    rendeError() {
        if (!this.state.error) {
            return;
        }
        return (
            <div className="error">
                {this.state.error}
            </div>
        );
    }

    render() {
        return (
            <div className="loginScreen">
                <div className="dialog dialogSmall centered">
                    <header>
                        <h1>Login</h1>
                        or <Link to="/register">create an account</Link>
                    </header>
                    <form onSubmit={this.handleSubmit.bind(this)}>

                        {this.rendeError()}

                        <div className="inputGroup">
                            <div className="formInput">
                                <label>Email Address</label>
                                <input type="text" placeholder="email address"/>
                            </div>
                            <div className="formInput">
                                <label>Password</label>
                                <input type="text" placeholder="no password required" disabled="disabled" />
                            </div>
                        </div>


                        <footer>
                            <div className="formButtons">
                                <button type="submit" className="button buttonFullWidth buttonGreen">Login</button>
                            </div>
                        </footer>
                    </form>

                </div>
            </div>
        );
    }
}

const IndexScreen = () => <h2>Home</h2>;
const RegisterScreen = () => <h2>Register</h2>;

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

class BoardScreen extends Component {
    render() {
        return (
            <div>
                <header className="boardHeader">
                    <span className="boardTitle">Task Board</span>
                </header>
            </div>
        );
    }
}

const App = () => (
    <Router history={history}>
        <div>
            <nav className="topNav">
                <div className="navLeft">
                    <Link className="button buttonGray buttonIcon" to="/"><FontAwesomeIcon icon={faHome} /></Link>
                    <Link className="button buttonGray buttonIcon" to="/board/"><FontAwesomeIcon icon={faThLarge} /></Link>
                </div>

                <div className="navCenter">

                </div>
                <Link className="navCenterLogo" to="/">
                    <img src="/images/brand_logo.png" /> LionTracks
                </Link>

                <div className="navRight">
                    Jonathan McCaffrey
                    <span className="dot">JM</span>
                    <button className="button buttonGray buttonIcon" onClick={ () => { fakeAuth.signout(() => { history.push('/') }) } }>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </div>
            </nav>

            <Route path="/" exact component={IndexScreen} />
            <Route path="/login/" component={LoginScreen} />
            <Route path="/register/" component={RegisterScreen} />
            <PrivateRoute path="/board/" component={BoardScreen} />
        </div>
    </Router>
);

export default App;
