import React, { Component } from 'react';

import { Panel } from '../UI/Panel';
import {actionCreators} from "../../actions";
import Progress from "../UI/Progress";
import TabbedArea from "../UI/Tab/TabbedArea";
import TabPane from "../UI/Tab/TabPane";

let nl2br = require('react-nl2br');

export default class NotePanel extends Component {
    constructor(props) {
        super(props);

        this._togglePanelClass = this._togglePanelClass.bind(this);
        this._handleNoteSubmit = this._handleNoteSubmit.bind(this);
    }

    _togglePanelClass() {
        let rowClass = 'tr.contact-row-' + this.props.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-note-panel-open');
    }

    _handleNoteSubmit(e) {
        e.preventDefault();

        actionCreators.addContactNote({
            id: this.props.contact.id,
            name: document.getElementById('note_title_' + this.props.contact.id).value,
            note: document.getElementById('note_content_' + this.props.contact.id).value
        });
    }

    render() {
        let notes = _.map(this.props.contact.notes, (note, index) => {
            return <div key={index} className="note">
                <h4 className="note-title">{note.name}</h4>
                <p>{nl2br(note.note)}</p>
            </div>
        });

        return (
            <div className="content-side-wrapper">
                <div className="contact-note-overlay side-overlay" onClick={this._togglePanelClass} />
                <div className="contact-note-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                {this.props.contact.first_name ? <div className="panel-user-name">{this.props.contact.first_name} {this.props.contact.last_name}</div> : ''}

                                {this.props.contact.company ? <div className="panel-user-subtitle">{this.props.contact.company.name}</div> : ''}

                                <div className="panel-user-action" onClick={this._togglePanelClass}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                            <div className="panel-user-score">
                                <Progress size={0}/>
                            </div>
                        </div>
                        <TabbedArea>
                            <TabPane title="Add Note" icon="event_note">
                                <div className="note-form">
                                    <form>
                                        <input type="text" className="form-control" name="note_title" id={"note_title_" + this.props.contact.id} placeholder="Note Title" />
                                        <textarea placeholder="Note" className="form-control" style={{width:"100%", height:"300px"}} name="note_content" id={"note_content_" + this.props.contact.id} />
                                        <br />
                                        <button className="button button-primary" type="submit" onClick={this._handleNoteSubmit}>Add Note</button>
                                    </form>
                                </div>
                            </TabPane>
                            <TabPane title="View Notes" icon="event_note">
                                <div className="note-container">
                                    {notes}
                                </div>
                            </TabPane>
                        </TabbedArea>
                    </Panel>
                </div>
            </div>
        );
    }
}
