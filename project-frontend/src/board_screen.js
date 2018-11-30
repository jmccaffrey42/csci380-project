import React, { Component } from "react";
import {faEllipsisH, faPlus, faBars, faComments, faAddressCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditableText from './editable_text';
import ApiClient from './api_client';


class CardList extends Component {
    onTitleChange(newTitle) {
        ApiClient.put('/lists/' + this.props.cardList.id, {title: newTitle})
            .catch((error) => {
                console.log("error saving list", error);
            });
    }

    render() {
        const { cardList, onCardClick } = this.props;
        const {id, title, cards} = cardList;

        return (
            <div className="cardListBox">
                <header>
                    <span className="cardListTitle"><EditableText value={title} multiline={false} onChange={this.onTitleChange.bind(this)} /></span>
                    <button className="button buttonLight buttonIcon"><FontAwesomeIcon icon={faEllipsisH} /></button>
                </header>

                <ul>
                    { cards.map((card) => ( <li onClick={() => onCardClick(card) } key={card.id}>{card.title}</li>)) }
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

    onBgClick() {
        this.setState({dialogCard: null});

    }

    onCardUpdate(field, newValue) {
        let update = {};
        update[field] = newValue;
        ApiClient.put('/cards/' + this.state.dialogCard.id, update)
            .then((updatedCard) => {

                let newLists = this.state.cardLists.slice();
                let cardList = newLists.find((l) => l.id === updatedCard.card_list_id);
                const cardIdx = cardList.cards.findIndex((c) => c.id === updatedCard.id);
                cardList.cards[cardIdx] = updatedCard;

                this.setState({cardLists: newLists});
            })
            .catch((error) => {
                console.log("error saving card", error);
            });
    }

    renderCardDetail() {
        const {dialogCard} = this.state;
        if (dialogCard === null) {
            return;
        }

        return (
            <div className="dialogContainer">
                <div className="dialogBg" onClick={this.onBgClick.bind(this)}/>
                <div className="dialog centered">
                    <div className="dialogBody">
                        <header>
                            <h1><FontAwesomeIcon className="icon" icon={faAddressCard} /><EditableText value={dialogCard.title} multiline={false} onChange={(val) => this.onCardUpdate('title', val) } /></h1>
                            in list <a href="">List Title</a>
                        </header>
                        <section>
                            <h2><FontAwesomeIcon className="icon" icon={faBars}/> Description</h2>
                            <EditableText value="This is a really nice card name" multiline={true} onChange={(val) => this.onCardUpdate('description', val) } />
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
        const {cardLists} = this.state;

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

                { this.renderCardDetail() }
            </div>
        );
    }
}

