import React, { Component } from "react";
import {faEllipsisH, faPlus, faBars, faComments, faAddressCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditableText from './editable_text';
import ApiClient from './api_client';
import authProvider from "./auth_provider";
import history from "./history";



export default class BoardScreen extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dialogCard: null,
            cardLists: [],
            loading: true
        }
    }

    componentDidMount() {
        ApiClient.get('/lists').then((lists) => {
            console.log(lists);
            this.setState({cardLists: lists, loading: false});
        });
    }

    onCardChange(updatedCard) {
        let newLists = this.state.cardLists.slice();
        if (updatedCard !== undefined && updatedCard !== null) {
            let cardList = newLists.find((l) => l.id === updatedCard.card_list_id);
            const cardIdx = cardList.cards.findIndex((c) => c.id === updatedCard.id);
            cardList.cards[cardIdx] = updatedCard;
        } else {
            let cardListIdx = newLists.findIndex((l) => l.id === this.state.dialogCard.card_list_id);
            newLists[cardListIdx].cards = newLists[cardListIdx].cards.filter((c) => c.id !== this.state.dialogCard.id);
            this.setState({dialogCard: null});
        }
        this.setState({cardLists: newLists});
    }

    render() {
        const {cardLists, dialogCard} = this.state;

        return (
            <div className="boardScreen">
                <header className="boardHeader">
                    <span className="boardTitle">Task Board</span>
                    <ul className="boardInfo">
                        <li>
                            { cardLists.length } lists
                        </li>

                        <li>
                            { cardLists.reduce((sum, l) => sum + l.cards.length, 0) } tasks
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
                    { cardLists.map((list) => (<CardList key={list.id} cardList={list} onCardClick={ (card) => this.setState({dialogCard: card}) } />)) }
                </section>

                { (dialogCard === null ? [] : <CardDetail card={dialogCard} onChange={ this.onCardChange.bind(this) } onClose={ (card) => this.setState({dialogCard: null}) } />) }
            </div>
        );
    }
}

