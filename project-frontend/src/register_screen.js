import history from "./history";
import {Link} from "react-router-dom";
import React, { Component } from "react";

import ApiClient from './api_client';
import authProvider from "./auth_provider";
import {faAddressCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class RegisterScreen extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            error: null
        };

        this.myRef = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();

        const postObject = {
            email: e.target.email.value,
            name: e.target.name.value
        };

        ApiClient.post('/auth/register', postObject)
            .then((user) => {
                user['token']=user['id'];
                authProvider.authenticate(user);
                history.push('/board');
            })
            .catch((error) => {
                if (error.errors !== undefined && error.errors['email'] !== undefined && error.errors['email'][0] === 'validation.unique') {
                    this.setState({error: "That email address is already taken by another account, maybe you already are registered."});
                } else if (error.message !== undefined) {
                    this.setState({error: error.message});
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
            <div className="registerScreen" ref={this.myRef}>
                <div className="dialog dialogSmall dialogCentered">
                    <div className="dialogBody">
                        <header>
                            <h1><FontAwesomeIcon className="icon" icon={faAddressCard} />Register</h1>
                        </header>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            {this.renderError()}

                            <div className="inputGroup">
                                <div className="formInput">
                                    <label>Email Address</label>
                                    <input type="text" name="email" placeholder="jsmith@email.com"/>
                                </div>
                                <div className="formInput">
                                    <label>First and Last Name</label>
                                    <input type="text" placeholder="John Smith" name="name" />
                                </div>
                            </div>

                            <footer>
                                <div className="formButtons">
                                    <button type="submit" className="button buttonFullWidth buttonGreen">Register</button>
                                </div>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
