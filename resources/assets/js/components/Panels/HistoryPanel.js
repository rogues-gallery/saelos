import React, { Component } from 'react';

import { Panel } from '../UI/Panel';

export default class HistoryPanel extends Component {
    constructor(props) {
        super(props);

        this._togglePanelClass = this._togglePanelClass.bind(this);
    }

    _togglePanelClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-history-panel-open');
    }

    render() {
        let history = this.props.contact.activities.map((activity, index) => {
            let recordUrl = activity.details.details.recordUrl ? <a href={activity.details.details.recordUrl} target="_blank">Listen to the call</a> : 'No recording available';

            return <li key={index}>
                <span className="line">&nbsp;</span>
                <span className="line-number">{index + 1}</span>
                <div className="line-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    {activity.details_type === "App\\CallActivity" ?
                        <p>{recordUrl}</p>
                        : ''}
                </div>
            </li>
        });

        return (
            <div className="content-side-wrapper">
                <div className="contact-history-overlay side-overlay" onClick={this._togglePanelClass} />
                <div className="contact-history-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                <div className="panel-user-name">History</div>
                                <div className="panel-user-subtitle">All the interactions</div>

                                <div className="panel-user-action" onClick={this._togglePanelClass}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                        </div>

                        <ul className="entity-history">
                            {history}
                        </ul>
                    </Panel>
                </div>
            </div>
        );
    }
}
