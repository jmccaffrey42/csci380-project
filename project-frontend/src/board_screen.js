import React, { Component } from "react";
import history from './history';
import authProvider from "./auth_provider";
import {faEllipsisH, faPlus, faBars, faComments, faAddressCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import EditableText from './editable_text'

class CardList extends Component {
    render() {
        return (
            <div className="cardListBox">
                <header>
                    <span className="cardListTitle"><EditableText value="List!" multiline={false} onChange={function() {}} /></span>
                    <button className="button buttonLight buttonIcon"><FontAwesomeIcon icon={faEllipsisH} /></button>
                </header>

                <ul>
                    <li>This is a really nice card name</li>
                    <li>The quick brown fox jumps over the lazy dog</li>
                    <li>Lorem ipsum dolar sit amet ...</li>
                    <li>This is a really nice card name</li>
                    <li>The quick brown fox jumps over the lazy dog</li>
                    <li>Lorem ipsum dolar sit amet ...</li>
                    <li>This is a really nice card name</li>
                    <li>The quick brown fox jumps over the lazy dog</li>
                    <li>Lorem ipsum dolar sit amet ...</li>
                </ul>

                <footer>
                    <button className="button buttonLight buttonFullWidth"><FontAwesomeIcon icon={faPlus}/> Add another card</button>
                </footer>
            </div>
        )
    }
}

export default class BoardScreen extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showDialog: true
        }
    }

    onBgClick() {
        this.setState({showDialog: false});

    }
    renderCardDetail() {
        if (!this.state.showDialog) {
            return;
        }

        return (
            <div className="dialogContainer">
                <div className="dialogBg" onClick={this.onBgClick.bind(this)}/>
                <div className="dialog centered">
                    <div className="dialogBody">
                        <header>
                            <h1><FontAwesomeIcon className="icon" icon={faAddressCard} /><EditableText value="This is a really nice card name" multiline={false} onChange={function() {}} /></h1>
                            in list <a href="">List Title</a>
                        </header>
                        <section>
                            <h2><FontAwesomeIcon className="icon" icon={faBars}/> Description</h2>
                            <EditableText value="This is a really nice card name" multiline={true} onChange={function() {}} />
                        </section>
                        <section>
                            <h2><FontAwesomeIcon className="icon" icon={faComments} /> Comments</h2>
                        </section>
                    </div>
                    <div className="dialogMenu">
                        <h3>ACTIONS</h3>
                        <ul>
                            <li><button className="button buttonGray buttonFullWidth">Test</button></li>
                            <li><button className="button buttonGray buttonFullWidth">Test</button></li>
                            <li><button className="button buttonGray buttonFullWidth">Test</button></li>
                        </ul>

                        <h3>MORE</h3>
                        <ul>
                            <li><button className="button buttonGray buttonFullWidth">Test</button></li>
                            <li><button className="button buttonGray buttonFullWidth">Test</button></li>
                            <li><button className="button buttonGray buttonFullWidth">Test</button></li>
                        </ul>

                    </div>

                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="boardScreen">
                <header className="boardHeader">
                    <span className="boardTitle">Task Board</span>
                    <ul className="boardInfo">
                        <li>
                            26 lists
                        </li>

                        <li>
                            102 tasks
                        </li>

                        <li className="boardMembers">
                            <span className="dot">JM</span>
                            <span className="dot">JM</span>
                            <span className="dot">JM</span>
                            <span className="dot">JM</span>
                        </li>
                    </ul>
                </header>

                <section className="mainBoard">
                    <CardList />
                    <CardList />
                    <CardList />
                    <CardList />
                </section>

                { this.renderCardDetail() }
            </div>
        );
    }
}

