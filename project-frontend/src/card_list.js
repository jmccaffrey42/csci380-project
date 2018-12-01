import ApiClient from "./api_client";
import EditableText from "./editable_text";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faPlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default class CardList extends Component {
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