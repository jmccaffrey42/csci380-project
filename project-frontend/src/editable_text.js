import React from 'react';
import PropTypes from 'prop-types';


export default class EditableText extends React.Component {
    static propTypes = {
        multiline: PropTypes.bool,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            editing: false
        };

        this.inputRef = React.createRef();
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onClick() {
        this.setState({ editing: true }, () => this.inputRef.current.focus());
    }

    onBlur() {
        this.setState({ editing: false });
        if (this.state.value !== this.props.value) {
            this.props.onChange(this.state.value);
        }
    }

    render() {
        const { multiline, placeholder } = this.props;
        const { value, editing } = this.state;
        return (
            <span className="editable-text">
                <span hidden={ editing } onClick={ this.onClick.bind(this) }>{ placeholder !== undefined && (value === null || value === '') ? placeholder : value }</span>
                { multiline ? (
                    <textarea hidden={ !editing } ref={ this.inputRef } className="editable-text" value={ value } onChange={ this.onChange.bind(this) }
                              onBlur={ this.onBlur.bind(this) } />
                ) : (
                    <input hidden={ !editing } ref={ this.inputRef } className="editable-text" type="text" value={ value } onChange={ this.onChange.bind(this) }
                           onBlur={ this.onBlur.bind(this) } />
                )}

            </span>
        );
    }
}
