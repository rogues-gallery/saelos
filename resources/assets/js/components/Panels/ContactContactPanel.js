import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import fetch from '../../utils/fetch';

export default class ContactContactPanel extends Component {
    constructor(props) {
        super(props);

        this._initPhoneCall = this._initPhoneCall.bind(this);
    }

    _togglePanelClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-contact-panel-open');
    }

    _initPhoneCall() {
        let URL = '/plivo/send/call/' + this.props.contact.id;

        let options = {
            method: 'POST',
            body: {
                recipient: '18159970741'
            },
            forAuth: true
        };

        fetch(URL, options);
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="contact-contact-overlay side-overlay" onClick={this._togglePanelClass.bind(this)} />
                <div className="contact-contact-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                {this.props.contact.first_name ? <div className="panel-user-name">{this.props.contact.first_name} {this.props.contact.last_name}</div> : ''}

                                {this.props.contact.company ? <div className="panel-user-subtitle">{this.props.contact.company.name}</div> : ''}

                                <div className="panel-user-action" onClick={this._togglePanelClass.bind(this)}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                            <div className="panel-user-available-actions">
                                <div className="user-action-box">
                                    <i className="md-icon">email</i><br />
                                    Email
                                </div>
                                <div className="user-action-box">
                                    <i className="md-icon">sms</i><br />
                                    SMS
                                </div>
                                <div className="user-action-box" onClick={this._initPhoneCall}>
                                    <i className="md-icon">phone</i><br />
                                    Phone
                                </div>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}