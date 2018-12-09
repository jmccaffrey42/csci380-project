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
        };

        this.listIndex = new Map();
    }

    componentDidMount() {
        ApiClient.get('/lists').then((lists) => {
            this.listIndex = new Map(lists.map((l, i) => [l.id, i]));

            lists.forEach((l) => {
                l.cards.sort((a, b) => a.sort_order - b.sort_order);
            });

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

    onMoveCard(item, isAfter = false) {
        const newCardLists = this.state.cardLists.slice();
        const srcList = newCardLists[this.listIndex.get(item.src_list_id)];
        const dstList = newCardLists[this.listIndex.get(item.dst_list_id)];
        const srcCardIdx = srcList.cards.findIndex((c) => c.id === item.src_card_id);
        const srcCard = srcList.cards[srcCardIdx];
        let dstCardIdx = dstList.cards.findIndex((c) => c.id === item.dst_card_id);

        srcCard.card_list_id = dstList.id;

        const dstCard = dstList.cards[dstCardIdx];
        const prevCard = dstList.cards[dstCardIdx - 1];

        let prevSortOrder = prevCard !== undefined ? prevCard.sort_order : 0;
        let nextSortOrder = dstCard.sort_order;

        if (nextSortOrder - prevSortOrder < 10) {
            dstList.cards.forEach((c, i) => {
                c.sort_order = 1000 * (i + 1);
                ApiClient.put('/cards/' + c.id, {
                    sort_order: c.sort_order
                })
            });
            prevSortOrder = prevCard !== undefined ? prevCard.sort_order : 0;
            nextSortOrder = dstCard.sort_order;
        }

        srcCard.sort_order = prevSortOrder + Math.ceil((nextSortOrder - prevSortOrder) / 2);

        srcList.cards.splice(srcCardIdx, 1);
        if (dstList === srcList && srcCardIdx < dstCardIdx) {
            dstCardIdx--;
        }
        dstList.cards.splice(dstCardIdx, 0, srcCard);

        ApiClient.put('/cards/' + srcCard.id, {
            sort_order: srcCard.sort_order,
            card_list_id: dstList.id
        });

        this.setState({cardLists: newCardLists});
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
                    { cardLists.map((list) => (<CardList key={list.id} cardList={list} onCardClick={ (card) => this.setState({dialogCard: card}) }
                                                         onMoveCard={this.onMoveCard.bind(this)}
                                                         onChange={(update) => this.onListChange(list.id, update)} />)) }
                </section>

                { (dialogCard === null ? [] : <CardDetail card={dialogCard} onChange={ this.onCardChange.bind(this) } onClose={ (card) => this.setState({dialogCard: null}) } />) }
            </div>
        );
    }
}

