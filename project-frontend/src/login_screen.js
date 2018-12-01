import history from "./history";
import {Link} from "react-router-dom";
import React, { Component } from "react";

import ApiClient from './api_client';
import authProvider from "./auth_provider";

export default class LoginScreen extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            error: null
        };

        this.myRef = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();

        ApiClient.post('/auth/login', { email: e.target.email.value })
            .then((user) => {
                authProvider.authenticate(user);
                history.push('/board');
            })
            .catch((error) => {
                if (error.status === 404) {
                    this.setState({error: "Email not found in database, please register and try again."});
                } else {
                    console.error(error);
                    this.setState({error: "Unknown login error(" + error.status + ") please try again later"});
                }
            });
    }

    renderError() {
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
            <div className="loginScreen" ref={this.myRef}>
                <div className="dialog dialogSmall dialogCentered">
                    <header>
                        <h1>Login</h1>
                        or <Link to="/register">create an account</Link>
                    </header>
                    <form onSubmit={this.handleSubmit.bind(this)}>

                        {this.renderError()}

                        <div className="inputGroup">
                            <div className="formInput">
                                <label>Email Address</label>
                                <input type="text" name="email" placeholder="email address"/>
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
