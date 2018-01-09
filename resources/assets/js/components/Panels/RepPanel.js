import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import {connect} from "react-redux";
import { actionCreators } from "../../actions";
import Gravatar from 'react-gravatar';
import PropTypes from "prop-types";

let _ = require('lodash');

class RepPanel extends Component {
    constructor(props) {
        super(props);

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._toggleBodyClass = this._toggleBodyClass.bind(this);
        this._toggleContactClass = this._toggleContactClass.bind(this);
        this._toggleNoteClass = this._toggleNoteClass.bind(this);
        this._toggleHistoryClass = this._toggleHistoryClass.bind(this);
        this._getContainerClass = this._getContainerClass.bind(this);

        this.state = {
            rep: Object.assign({}, props.rep)
        }
    }

    _handleFormSubmit() {
        actionCreators.postUser(this.state.formState, this.props.dispatch);

        this.setState({
            formState: this.state.rep
        })
    }

    _getContainerClass() {
        return '.rep-item-' + this.props.rep.id;
    }

    _toggleBodyClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('rep-panel-open');
        document.querySelector('body').classList.toggle('panel-open');

        this._handleFormSubmit();
    }

    _toggleContactClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('rep-rep-panel-open');
    }

    _toggleNoteClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('rep-note-panel-open');
    }

    _toggleHistoryClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('rep-history-panel-open');
    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let formState = this.state.formState;

        // Special handling for custom field state
        if (/custom_fields/.test(name)) {
            name = name + '.value';
        }

        _.set(formState, name, value);

        this.setState({
            formState: formState
        });
    }

    _getCustomFields() {
        return Object.keys(this.props.rep.custom_fields).map((key, index) => {
            let thisField = this.props.rep.custom_fields[key];
            let input = '';

            switch (thisField.type) {
                case 'select':
                case 'picklist':
                    let options = Object.keys(thisField.options).map((option, i) => {
                        return <option key={i} value={option}>{thisField.options[option]}</option>
                    });

                    input = <select name={"custom_fields." + thisField.alias} onChange={this._handleInputChange}>
                        {options}
                    </select>
                    break;
                case 'lookup':
                case 'text':
                default:
                    input = <input type="text" name={"custom_fields." + thisField.alias} onChange={this._handleInputChange} defaultValue={thisField.value} placeholder={thisField.label} />
                    break;
            }


            return (
                <div key={index} className="input-container">
                    <label>{thisField.label}</label>
                    {input}
                </div>
            )
        });
    }

    render() {
        let customFields = this._getCustomFields();

        return (
            <div className="content-side-wrapper">
                <div className="rep-panel-overlay side-overlay" onClick={this._toggleBodyClass} />
                <div className="rep-panel-side side-panel">
                <Panel>
                        <div className="panel-user">
                            <div className="panel-user-avatar">
                                <Gravatar email={this.props.rep.email} />
                            </div>

                            <div className="panel-user-content">
                                {this.props.rep.name ? <div className="panel-user-name">{this.props.rep.name}</div> : ''}

                                <div className="panel-user-action" onClick={this._toggleBodyClass}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                            <div className="panel-rep-score">
                                <Progress size={70}/>
                            </div>
                        </div>

                        <div className="panel-rep-details">
                            <form className="flex-row-even">
                                <div>
                                    <div className="input-container">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder="Name" defaultValue={this.props.rep.name} onChange={this._handleInputChange} />
                                    </div>
                                    <div className="input-container">
                                        <label>Phone</label>
                                        <input type="text" name="phone" placeholder="Phone" defaultValue={this.props.rep.phone} onChange={this._handleInputChange} />
                                    </div>

                                    <div className="input-container">
                                        <label>Email</label>
                                        <input type="text" name="email" placeholder="Email" defaultValue={this.props.rep.email} onChange={this._handleInputChange} />
                                    </div>

                                </div>
                                <div>
                                    {customFields}
                                </div>
                            </form>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}

RepPanel.propTypes = {
    rep: PropTypes.object.isRequired
};

export default connect()(RepPanel)
