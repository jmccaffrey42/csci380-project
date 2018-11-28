import React, { Component } from "react";
import history from './history';
import auth from './auth';
import {faEllipsisH, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class CardList extends Component {
    render() {
        return (
            <div className="cardListBox">
                <header>
                    <span className="cardListTitle">List Title</span>
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
            </div>
        );
    }
}

