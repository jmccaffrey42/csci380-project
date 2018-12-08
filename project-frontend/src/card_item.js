import React, {Component} from "react";
import {DragSource, DropTarget} from "react-dnd";
import PropTypes from "prop-types";
import classSet from 'react-classset';

class CardItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {card, connectDragSource, connectDropTarget, isOver, onClick} = this.props;

        return connectDropTarget(connectDragSource(
            <div className={classSet({
                "taskCardContainer": true,
                "dragOver": isOver
            })}>
                { (isOver ? <div className="dragCardPlaceholder" /> : []) }
                <div className="taskCard" onClick={onClick}>
                    {card.title}
                </div>
            </div>
        ));
    }
}

const cardTarget = {
    drop(props, monitor) {
        let item = monitor.getItem();
        item.dst_card_id = props.card.id;
        item.dst_list_id = props.card.card_list_id;
        item.dst_order = props.card.sort_order;
        props.onMoveCard(item);
    }
};

const cardSource = {
    beginDrag(props) {
        let dndProps = {
            src_card_id: props.card.id,
            src_list_id: props.card.card_list_id
        };

        if (props.onBeginDrag) {
            return props.onBeginDrag(dndProps)
        } else {
            return dndProps;
        }
    }
};

export default
DropTarget('CARD', cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
})
)(
DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})
)(CardItem));

