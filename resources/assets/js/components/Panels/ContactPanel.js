import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import {connect} from "react-redux";
import { actionCreators } from "../../actions";
import EditContactForm from '../Forms/EditContactForm';
import NewContactForm from '../Forms/NewContactForm';
import Gravatar from 'react-gravatar';

let _ = require('lodash');

class ContactPanel extends Component {
    constructor(props) {
        super(props);

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._setFormState = this._setFormState.bind(this);
        this._toggleBodyClass = this._toggleBodyClass.bind(this);
        this._toggleContactClass = this._toggleContactClass.bind(this);
        this._toggleNoteClass = this._toggleNoteClass.bind(this);
        this._toggleHistoryClass = this._toggleHistoryClass.bind(this);
        this._getContainerClass = this._getContainerClass.bind(this);

        this.state = {
            contact: Object.assign({}, props.contact)
        }
    }

    _handleFormSubmit() {
        actionCreators.postContact(this.state.formState, this.props.dispatch);

        this.setState({
            formState: this.state.contact
        })
    }

    _setFormState(data) {
        this.setState({
            formState: data
        })
    }

    _getContainerClass() {
        return '.contact-row-' + this.props.contact.id;
    }

    _toggleBodyClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('contact-panel-open');

        this._handleFormSubmit();
    }

    _toggleContactClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('contact-contact-panel-open');
    }

    _toggleNoteClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('contact-note-panel-open');
    }

    _toggleHistoryClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('contact-history-panel-open');
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="contact-side-overlay side-overlay" onClick={this._toggleBodyClass} />
                <div className="contact-side side-panel">
                    <Panel>
                        {this.props.contact.id !== 'new' ?
                            <div className="panel-user">
                                <div className="panel-user-avatar">
                                    <Gravatar email={this.props.contact.email} />
                                </div>

                                <div className="panel-user-content">
                                    {this.props.contact.first_name ? <div className="panel-user-name">{this.props.contact.first_name} {this.props.contact.last_name}</div> : ''}

                                    {this.props.contact.company ? <div className="panel-user-subtitle">{this.props.contact.company.name}</div> : ''}

                                    <div className="panel-user-action" onClick={this._toggleBodyClass}>
                                        <i className="md-icon">close</i>
                                    </div>
                                </div>
                                <div className="panel-user-score">
                                    <Progress size={70}/>
                                </div>
                                <div className="panel-user-available-actions">
                                    <div className="user-action-box" onClick={this._toggleHistoryClass}>
                                        <i className="md-icon">search</i><br />
                                        History
                                    </div>
                                    <div className="user-action-box" onClick={this._toggleNoteClass}>
                                        <i className="md-icon">event_note</i><br />
                                        Notes
                                    </div>
                                    <div className="user-action-box" onClick={this._toggleContactClass}>
                                        <i className="md-icon">chat_bubble_outline</i><br />
                                        Contact
                                    </div>
                                </div>
                            </div>
                        :
                            <div className="panel-user">
                                <div className="panel-user-content">
                                    <div className="panel-user-name">Create Contact</div>
                                    <div className="panel-user-action" onClick={this._toggleBodyClass}>
                                        <i className="md-icon">close</i>
                                    </div>
                                </div>
                                <div className="panel-user-score">
                                    <Progress size={0}/>
                                </div>
                            </div>
                        }

                        <div className="panel-contact-details">
                            {this.props.contact.id === 'new' ?
                                <NewContactForm contact={this.props.contact} setFormState={this._setFormState}/>
                            :
                                <EditContactForm contact={this.props.contact} setFormState={this._setFormState}/>
                            }

                        </div>

                        {this.props.contact.id !== 'new' ?
                            <div className="panel-actions">
                                <strong>Recommended Action</strong>
                                <p>Wait <strong>2 days</strong> before taking next step.</p>
                            </div>
                        : ''}
                    </Panel>
                </div>
            </div>
        );
    }
}

export default connect()(ContactPanel)
