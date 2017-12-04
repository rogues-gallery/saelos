import React, { Component } from 'react';

import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";

export default class AccountPanel extends Component {
    _togglePanelClass() {
        let itemClass = 'div.account-item-' + this.props.account.id;

        document.querySelector(itemClass).classList.toggle('account-panel-open');
    }

    _toggleHistoryClass() {
        let itemClass = 'div.account-item-' + this.props.account.id;

        document.querySelector(itemClass).classList.toggle('account-history-panel-open');
    }

    _toggleEditClass() {
        let itemClass = 'div.account-item-' + this.props.account.id;

        document.querySelector(itemClass).classList.toggle('account-edit-panel-open');
    }

    _toggleContactClass() {
        let itemClass = 'div.account-item-' + this.props.account.id;

        document.querySelector(itemClass).classList.toggle('account-contact-panel-open');
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="account-side-overlay side-overlay" onClick={this._togglePanelClass.bind(this)} />
                <div className="account-panel-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                {this.props.account.name ? <div className="panel-user-name">{this.props.account.name}</div> : ''}
                                {this.props.account.client_name ? <div className="panel-user-subtitle">{this.props.account.client_name}</div> : ''}

                                <div className="panel-user-action" onClick={this._togglePanelClass.bind(this)}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                            <div className="panel-user-score">
                                <Progress size={80} />
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
                                    Documents
                                </div>
                            </div>
                        </div>

                        <div className="panel-contact-details">
                            <form id="contact-details-form">
                                <div className="panel-contact-details-column">
                                    <label>Amount</label>
                                    <input type="text" value={this.props.account.amount} />
                                </div>
                                <div className="panel-contact-details-column">
                                    {this.props.account.status ?
                                        <div>
                                            <label>Status</label>
                                            {this.props.account.status.name}
                                        </div>
                                        : ''}

                                    <label>Next Step</label>
                                    {this.props.account.next_step}

                                    <label>Interests</label>
                                    Maven, Maestro, Mautic Cloud

                                    <label>Last Interaction</label>
                                    <p>Output phone call with Alex W. on Nov 18 with a rep score of 6.</p>
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
