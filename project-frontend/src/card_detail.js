import ApiClient from "./api_client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faBars, faComments} from "@fortawesome/free-solid-svg-icons";
import EditableText from "./editable_text";
import React from "react";

export default class CardDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            card: null,
            loading: true
        }
    }

    componentDidMount() {
        const id = this.props.card.id;
        ApiClient.get('/cards/' + id).then((card) => {
            card.comments.sort((a,b) => a.created_at > b.created_at ? 1 : -1);
            this.setState({card: card, loading: false});
        });
    }

    onBgClick() {
        this.props.onClose();
    }

    onCardUpdate(field, newValue) {
        let update = {};
        update[field] = newValue;
        ApiClient.put('/cards/' + this.props.card.id, update)
            .then((updatedCard) => {
                this.props.onChange(updatedCard);
            })
            .catch((error) => {
                console.log("error saving card", error);
            });
    }

    onCommentSubmit(e) {
        e.preventDefault();

        const postObject = {
            card_id: this.props.card.id,
            body: e.target.comment.value
        };

        const formTarget = e.target;

        ApiClient.post('/comments', postObject)
            .then((comment) => {
                const newCard = Object.assign({}, this.state.card);
                newCard.comments.push(comment);
                this.setState({card: newCard});
                formTarget.reset();
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

    onDeleteClick() {
        ApiClient.delete('/cards/' + this.props.card.id)
            .then(() => {
                this.props.onChange(null);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const card = this.state.card;
        if (card === null) {
            return [];
        }

        return (
            <div className="dialogContainer">
                <div className="dialogBg" onClick={this.onBgClick.bind(this)}/>
                <div className="dialog centered">
                    <div className="dialogBody">
                        <header>
                            <h1><FontAwesomeIcon className="icon" icon={faAddressCard} /><EditableText value={card.title} multiline={false} onChange={(val) => this.onCardUpdate('title', val) } /></h1>
                        </header>
                        <section>
                            <h2><FontAwesomeIcon className="icon" icon={faBars}/> Description</h2>
                            <EditableText value={card.description} multiline={true} onChange={(val) => this.onCardUpdate('description', val) } />
                        </section>
                        <section>
                            <h2><FontAwesomeIcon className="icon" icon={faComments} /> Comments</h2>
                            <ul>
                                { card.comments.map((comment) => <li key={comment.id}>{comment.user.name} @ {comment.created_at} <br/> {comment.body}</li>) }
                            </ul>

                            <form onSubmit={this.onCommentSubmit.bind(this)}>
                                <div className="inputGroup">
                                    <div className="formInput">
                                        <label>Post a comment</label>
                                        <input type="textarea" name="comment" />
                                    </div>
                                    <div className="formInput">
                                        <button type="submit">Post</button>
                                    </div>
                                </div>

                            </form>
                        </section>
                    </div>
                    <div className="dialogMenu">
                        <h3>ACTIONS</h3>
                        <ul>
                            <li><button className="button buttonGray buttonFullWidth" onClick={this.onDeleteClick.bind(this)}>Delete Task</button></li>
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

}