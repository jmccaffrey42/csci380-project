import React, { Component } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import ApiClient from './api_client';
import CardList from './card_list';
import CardDetail from './card_detail';


export default class BoardScreen extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dialogCard: null,
            cardLists: [],
            loading: true,
            createListFormVisible: false
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

    onListChange(id, updatedList) {
        let newLists = this.state.cardLists.slice();
        if (updatedList !== undefined && updatedList !== null) {
            let cardListIdx = newLists.findIndex((l) => l.id === id);
            newLists[cardListIdx] = updatedList;
        } else {
            newLists = newLists.filter((l) => l.id !== id);
        }
        this.setState({cardLists: newLists});
    }

    onCreateListSubmit(e) {
        e.preventDefault();

        const postObject = {
            title: e.target.title.value,
            x: 0, y: 0
        };

        ApiClient.post('/lists', postObject)
            .then((list) => {
                const newLists = this.state.cardLists.slice();
                list.cards = [];
                newLists.push(list);
                this.setState({createListFormVisible:false, cardLists: newLists});
            })
            .catch((error) => {
                if (error.message !== undefined) {
                    this.setState({error: error.message});
                } else {
                    console.error(error);
                    this.setState({error: "Unknown login error(" + error.status + ") please try again later"});
                }
            });
    }

    renderCreateList() {
        if (!this.state.createListFormVisible) {
            return [];
        }

        return (
            <div className="createListForm" >
                <form onSubmit={this.onCreateListSubmit.bind(this)}>
                    <input name="title" placeholder="List title" />
                    <button type="submit">Save</button>
                </form>
            </div>
        );
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
                        <li>
                            <button className="button buttonLight" onClick={() => this.setState({createListFormVisible:true})}><FontAwesomeIcon icon={faPlus}/> Add Task List</button>
                            { this.renderCreateList() }
                        </li>
                    </ul>
                </header>

                <section className="mainBoard">
                    { cardLists.map((list) => (<CardList key={list.id} cardList={list} onCardClick={ (card) => this.setState({dialogCard: card}) } onChange={(update) => this.onListChange(list.id, update)} />)) }
                </section>

                { (dialogCard === null ? [] : <CardDetail card={dialogCard} onChange={ this.onCardChange.bind(this) } onClose={ (card) => this.setState({dialogCard: null}) } />) }
            </div>
        );
    }
}

