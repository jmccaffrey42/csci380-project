import auth from "./auth";
import history from "./history";
import {Link} from "react-router-dom";
import React, { Component } from "react";

export default class LoginScreen extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            error: null
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        auth.authenticate(() => {
            history.push('/board');
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
            <div className="loginScreen">
                <div className="dialog dialogSmall centered">
                    <header>
                        <h1>Login</h1>
                        or <Link to="/register">create an account</Link>
                    </header>
                    <form onSubmit={this.handleSubmit.bind(this)}>

                        {this.renderError()}

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
