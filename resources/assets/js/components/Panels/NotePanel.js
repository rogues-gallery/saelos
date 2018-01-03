import React, { Component } from 'react';

import { Panel } from '../UI/Panel';

export default class NotePanel extends Component {
    _togglePanelClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-note-panel-open');
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="contact-note-overlay side-overlay" onClick={this._togglePanelClass.bind(this)} />
                <div className="contact-note-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                {this.props.contact.first_name ? <div className="panel-user-name">{this.props.contact.first_name} {this.props.contact.last_name}</div> : ''}

                                {this.props.contact.company ? <div className="panel-user-subtitle">{this.props.contact.company.name}</div> : ''}

                                <div className="panel-user-action" onClick={this._togglePanelClass.bind(this)}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                        </div>

                        User Notes

                    </Panel>
                </div>
            </div>
        );
    }
}
