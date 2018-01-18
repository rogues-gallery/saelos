import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import {connect} from "react-redux";
import { actionCreators } from "../../actions";
import EditContactForm from '../Forms/EditContactForm';
import NewContactForm from '../Forms/NewContactForm';
import ContactContactPanel from './ContactContactPanel';
import NotePanel from './NotePanel';
import HistoryPanel from './HistoryPanel';
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';
import * as types from '../../actions/types';

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

    _toggleBodyClass() {
        let exists = document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');

        if (!exists) {
            this.props.dispatch({
                type: types.CLEAR_CONTACT_FOR_FLYOUT
            })
        }

        // Clear all inputs after submit
        document.getElementById('contact-panel-wrapper')
            .querySelectorAll('input').forEach((child) => { child.value = null; });

        document.querySelector('body').classList.toggle('panel-open');

        this._handleFormSubmit();
    }

    _toggleContactClass() {
        document.getElementById('contact-panel-wrapper').classList.toggle('contact-contact-panel-open');
    }

    _toggleNoteClass() {
        this.props.dispatch({
            type: types.SET_NOTES_FOR_FLYOUT,
            data: this.props.contact.notes,
            entityId: this.props.contact.id,
            entityType: 'App\\Person'
        });

        document.getElementById('contact-panel-wrapper').classList.toggle('note-panel-open');
    }

    _toggleHistoryClass() {
        document.getElementById('contact-panel-wrapper').classList.toggle('history-panel-open');
    }

    render() {
        return (
            <div id="contact-panel-wrapper">
                <div className="contact-side-overlay side-overlay" onClick={this._toggleBodyClass} />
                <div className="contact-side side-panel">
                    <Panel>
                        {this.props.contact.id ?
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
                            {this.props.contact.id ?
                                <EditContactForm contact={this.props.contact} setFormState={this._setFormState}/>
                            :
                                <NewContactForm contact={this.props.contact} setFormState={this._setFormState}/>
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
                <HistoryPanel activities={this.props.contact.activities ? this.props.contact.activities : []} targetParentPanel="contact-panel-wrapper" />
                <NotePanel itemId={this.props.contact.id ? this.props.contact.id : 0} addNoteFunc={actionCreators.addContactNote} notes={this.props.contact.notes ? this.props.contact.notes : []} targetParentPanel="contact-panel-wrapper" />
                <ContactContactPanel contact={this.props.contact} dispatch={this.props.dispatch} />
            </div>
        );
    }
}

ContactPanel.propTypes = {
    dispatch: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        contact: store.contactFlyoutState.data
    }
})(ContactPanel)
