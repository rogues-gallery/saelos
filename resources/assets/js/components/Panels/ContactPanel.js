import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import { actionCreators } from "../../actions";

let _ = require('lodash');

export default class ContactPanel extends Component {
    constructor(props) {
        super(props);

        this._toggleBodyClass = this._toggleBodyClass.bind(this);
        this._toggleContactClass = this._toggleContactClass.bind(this);
        this._toggleEditClass = this._toggleEditClass.bind(this);
        this._toggleHistoryClass = this._toggleHistoryClass.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);

        this.state = {
            contact: props.contact
        }
    }

    _toggleBodyClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-panel-open');

        this.props.dispatch(actionCreators.postContact(this.state.contact));
    }

    _toggleContactClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-contact-panel-open');
    }

    _toggleEditClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-edit-panel-open');
    }

    _toggleHistoryClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-history-panel-open');
    }

    _handleFormSubmit(event) {
        event.preventDefault();

        this.props.dispatch(actionCreators.postContact(this.state.contact));
    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let contactState = this.state.contact;

        _.set(contactState, name, value);

        this.setState({
            contact: contactState
        });
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="contact-side-overlay side-overlay" onClick={this._toggleBodyClass} />
                <div className="contact-side side-panel">
                    <Panel>
                        <div className="panel-user">
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
                                <div className="user-action-box" onClick={this._toggleEditClass}>
                                    <i className="md-icon">edit</i><br />
                                    Edit
                                </div>
                                <div className="user-action-box" onClick={this._toggleContactClass}>
                                    <i className="md-icon">chat_bubble_outline</i><br />
                                    Contact
                                </div>
                            </div>
                        </div>

                        <div className="panel-contact-details">
                            <form id="contact-details-form" onSubmit={this._handleFormSubmit}>
                                <div className="panel-contact-details-column">
                                    <div className="input-container">
                                        <label>Phone</label>
                                        <input type="text" name="phone" defaultValue={this.props.contact.phone} onChange={this._handleInputChange} />
                                    </div>

                                    <div className="input-container">
                                        <label>Email</label>
                                        <input type="text" name="email" defaultValue={this.props.contact.email} />
                                    </div>

                                    <div className="input-container">
                                        <label>Address</label>
                                        <input type="text" name="address1" defaultValue={this.props.contact.address1} onChange={this._handleInputChange} />
                                        <input type="text" name="address2" defaultValue={this.props.contact.adress2} onChange={this._handleInputChange}/>
                                        <input type="text" name="city" defaultValue={this.props.contact.city} onChange={this._handleInputChange} />
                                        <input type="text" name="state" defaultValue={this.props.contact.state} onChange={this._handleInputChange} />
                                        <input type="text" name="zip" defaultValue={this.props.contact.zip} onChange={this._handleInputChange} />
                                    </div>

                                    {this.props.contact.company ?
                                        <div className="input-container">
                                            <label>Company</label>
                                            <input type="text" name="company.address1" defaultValue={this.props.contact.company.address1} onChange={this._handleInputChange} />
                                            <input type="text" name="company.address2" defaultValue={this.props.contact.company.address2} onChange={this._handleInputChange} />
                                            <input type="text" name="company.city" defaultValue={this.props.contact.company.city} onChange={this._handleInputChange} />
                                            <input type="text" name="company.state" defaultValue={this.props.contact.company.state} onChange={this._handleInputChange}/>
                                            <input type="text" name="company.zip" defaultValue={this.props.contact.company.zip} onChange={this._handleInputChange} />
                                        </div>
                                    : ''}
                                </div>
                                <div className="panel-contact-details-column">
                                    <label>Stage</label>
                                    Contact Stage

                                    <label>Next Step</label>
                                    Send updated sales information

                                    <label>Interests</label>
                                    Maven, Maestro, Mautic Cloud

                                    <label>Last Interaction</label>
                                    <p>Output phone call with Alex W. on Nov 18 with a rep score of 6.</p>

                                    <label>Value</label>
                                    <p>$12,500 which contributes 4% to total pipeline.</p>
                                </div>
                            </form>
                        </div>
                        <div className="panel-actions">
                            <strong>Recommended Action</strong>
                            <p>Wait <strong>2 days</strong> before taking next step.</p>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}
