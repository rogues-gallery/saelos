import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import PropTypes from 'prop-types';
import * as types from '../../actions/types';
import { MentionWrapper, MentionMenu } from 'react-githubish-mentions';
import {togglePanel} from "../../utils/helpers";

let nl2br = require('react-nl2br');

class NotePanel extends Component {
    constructor(props) {
        super(props);

        this._togglePanelClass = this._togglePanelClass.bind(this);
        this._handleNoteSubmit = this._handleNoteSubmit.bind(this);
    }

    _togglePanelClass() {
        togglePanel(this.props.targetParentPanel, 'note-panel-open');

        this.props.dispatch({
            type: types.CLEAR_NOTES_FOR_FLYOUT
        });
    }

    _handleNoteSubmit(e) {
        e.preventDefault();

        let title = document.getElementById("note_title-" + this.props.targetParentPanel);
        let content = document.getElementById("note_content-" + this.props.targetParentPanel);

        this.props.addNoteFunc({
            id: this.props.itemId,
            name: title.value,
            note: content.value
        });

        title.value = null;
        content.value = null;
    }

    render() {
        let notes = _.map(this.props.notes, (note, index) => {
            let after = note.user.name + ' on ' + note.created_at;

            return <div key={index} className="note">
                <h4 className="note-title">{note.name}</h4>
                <small>{after}</small>
                <p>{nl2br(note.note)}</p>
            </div>
        });

        const atQuery = async (query) => {
            const us = this.props.user.team.users.map((user) => ({value: user.username}));

            return us.filter((member) => member.value.startsWith(query));
        }

        const MenuItem = (props) => {
            const {active, value} = props;
            const customStyle = {
                backgroundColor: active ? 'blue' : 'white'
            };

            if (active) {
                customStyle.color = 'white';
            }

            return (
                <div style={customStyle}>
                    {value}
                </div>
            )
        }

        return (
            <div>
                <div className="note-overlay side-overlay" onClick={this._togglePanelClass} />
                <div className="note-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                <div className="header">
                                    <div className="panel-user-name">Notes</div>

                                    <div className="panel-user-action" onClick={this._togglePanelClass}>
                                        <i className="md-icon">close</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-contact-details">
                            <div className="note-form">
                                <h2>Add Note</h2>
                                <form>
                                    <input type="text" className="form-control" name="note_title" id={"note_title-" + this.props.targetParentPanel} placeholder="Note Title" />
                                    <MentionWrapper placeholder="Note" className="form-control" style={{width:"100%", height:"200px"}} name="note_content" id={"note_content-" + this.props.targetParentPanel}>
                                        <MentionMenu className="mention-menu" trigger="@" item={MenuItem} resolve={atQuery} />
                                    </MentionWrapper>
                                    <br />
                                    <button className="button button-primary" type="submit" onClick={this._handleNoteSubmit}>Add Note</button>
                                </form>
                            </div>
                            <div className="note-container">
                                <h2>Notes</h2>
                                {notes}
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}

NotePanel.propTypes = {
    targetParentPanel: PropTypes.string.isRequired,
    addNoteFunc: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired,
    itemId: PropTypes.number.isRequired
}

export default connect((store) => {
    return {
        notes: store.notesState.data,
        dataAppended: store.notesState.dataAppended,
        dataUpdated: store.notesState.dataUpdated,
        user: store.authState.user
    }
})(NotePanel);