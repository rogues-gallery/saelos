import React, { Component } from 'react';

import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";

export default class ContactPanel extends Component {
    _toggleBodyClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;
        let row      = document.querySelector(rowClass);

        if (row.classList.contains('action-panel-open')) {
            row.classList.toggle('action-panel-open');
        } else {
            row.classList.toggle('contact-panel-open');
        }
    }

    _toggleHistoryClass() {
        let rowClass = 'contact-row-' + this.props.contact.id;

        document.querySelector('tr.' + rowClass).classList.toggle('contact-history-panel-open');
    }

    _toggleEditClass() {
        let rowClass = 'contact-row-' + this.props.contact.id;

        document.querySelector('tr.' + rowClass).classList.toggle('contact-edit-panel-open');
    }

    _toggleContactClass() {
        let rowClass = 'contact-row-' + this.props.contact.id;

        document.querySelector('tr.' + rowClass).classList.toggle('contact-contact-panel-open');
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="contact-side-overlay side-overlay" onClick={this._toggleBodyClass.bind(this)} />
                <div className="contact-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                {this.props.contact.first_name ? <div className="panel-user-name">{this.props.contact.first_name} {this.props.contact.last_name}</div> : ''}

                                {this.props.contact.company ? <div className="panel-user-subtitle">{this.props.contact.company.name}</div> : ''}

                                <div className="panel-user-action" onClick={this._toggleBodyClass.bind(this)}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                            <div className="panel-user-score">
                                <Progress size={70}/>
                            </div>
                            <div className="panel-user-available-actions">
                                <div className="user-action-box" onClick={this._toggleHistoryClass.bind(this)}>
                                    <i className="md-icon">search</i><br />
                                    History
                                </div>
                                <div className="user-action-box" onClick={this._toggleEditClass.bind(this)}>
                                    <i className="md-icon">edit</i><br />
                                    Edit
                                </div>
                                <div className="user-action-box" onClick={this._toggleContactClass.bind(this)}>
                                    <i className="md-icon">chat_bubble_outline</i><br />
                                    Contact
                                </div>
                            </div>
                        </div>

                        <div className="panel-contact-details">
                            <form id="contact-details-form">
                                <div className="panel-contact-details-column">
                                    <label>Phone</label>
                                    <input type="text" defaultValue={this.props.contact.phone} />

                                    <label>Email</label>
                                    <input type="text" defaultValue={this.props.contact.email} />

                                    <label>Address</label>
                                    <input type="text" defaultValue={this.props.contact.homeAddress1} />
                                    <input type="text" defaultValue={this.props.contact.homeAddress2} />
                                    <input type="text" defaultValue={this.props.contact.homeCity} />
                                    <input type="text" defaultValue={this.props.contact.homeState} />
                                    <input type="text" defaultValue={this.props.contact.homeZip} />

                                    <label>Company</label>
                                    <input type="text" defaultValue={this.props.contact.workAddress1} />
                                    <input type="text" defaultValue={this.props.contact.workdAddress2} />
                                    <input type="text" defaultValue={this.props.contact.workCity} />
                                    <input type="text" defaultValue={this.props.contact.workState} />
                                    <input type="text" defaultValue={this.props.contact.workZip} />
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
