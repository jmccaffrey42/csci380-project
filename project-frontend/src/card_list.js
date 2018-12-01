import ApiClient from "./api_client";
import EditableText from "./editable_text";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from "react";

export default class CardList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            menuVisible: false,
            createFormVisible: false
        }
    }

    onDeleteClick() {
        ApiClient.delete('/lists/' + this.props.cardList.id)
            .then(() => {
                this.props.onChange(null);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onTitleChange(newTitle) {
        ApiClient.put('/lists/' + this.props.cardList.id, {title: newTitle})
            .catch((error) => {
                console.log("error saving list", error);
            });
    }

    renderMenu() {
        if (!this.state.menuVisible) {
            return [];
        }

        return (
            <ul className="cardListMenu">
                <li><button className="button buttonLight" onClick={this.onDeleteClick.bind(this)}>Delete List</button></li>
            </ul>
        )
    }

    onCreateSubmit(e) {
        e.preventDefault();

        const postObject = {
            card_list_id: this.props.cardList.id,
            title: e.target.title.value,
            description: 'this is a test',
            sort_order: this.props.cardList.cards.length
        };

        ApiClient.post('/cards', postObject)
            .then((card) => {
                const newList = Object.assign({}, this.props.cardList);
                newList.cards.push(card);
                this.setState({createFormVisible:false});
                this.props.onChange(newList);
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

    renderCreateForm() {
        if (!this.state.createFormVisible) {
            return [];
        }

        return (
            <li>
                <form onSubmit={this.onCreateSubmit.bind(this)}>
                    <input type="text" name="title" placeholder="Task name"/>
                </form>
            </li>
        )
    }

    render() {
        const {menuVisible, createFormVisible} = this.state;
        const { cardList, onCardClick } = this.props;
        const {id, title, cards} = cardList;

        return (
            <div className="cardListBox">
                <header>
                    <span className="cardListTitle"><EditableText value={title} multiline={false} onChange={this.onTitleChange.bind(this)} /></span>
                    <button className="button buttonLight buttonIcon" onClick={() => this.setState({menuVisible: !menuVisible})}><FontAwesomeIcon icon={faEllipsisH} /></button>
                    { this.renderMenu() }
                </header>

                <ul>
                    { cards.map((card) => ( <li onClick={() => onCardClick(card) } key={card.id}>{card.title}</li>)) }
                    { this.renderCreateForm() }
                </ul>

                <footer>
                    <button className="button buttonLight buttonFullWidth" onClick={() => this.setState({createFormVisible: true})}><FontAwesomeIcon icon={faPlus} disabled={createFormVisible ? 'disabled' : false}/>Add another card</button>
                </footer>
            </div>
        )
    }
}