import React from "react";
import PropTypes from "prop-types";
import * as MDIcons from "react-icons/lib/md";
import Note from "../Note";
import TextTruncate from "react-text-truncate";
import { saveNote, deleteNote } from "../service";
import ContentEditable from "react-contenteditable";
import { openTaskContainer } from "../../activities/store/actions";
import Contact from "../../contacts/Contact";
import Company from "../../companies/Company";
import Opportunity from "../../opportunities/Opportunity";

class Notes extends React.Component {
  _toggleAdd = () => {
    const { model, dispatch } = this.props;

    dispatch(openTaskContainer(model, "note"));
  };

  render() {
    const { model, dispatch, user } = this.props;
    const { notes } = model;

    return (
      <div className="card">
        <div className="card-header" id="headingNotes">
          <a
            href="javascript:void(0);"
            className="float-right"
            onClick={this._toggleAdd}
          >
            <strong>+ Add</strong>
          </a>
          <h6
            className="mb-0"
            data-toggle="collapse"
            data-target="#collapseNotes"
            aria-expanded="true"
            aria-controls="collapseNotes"
          >
            <MDIcons.MdKeyboardArrowDown /> Notes{" "}
            <span className="text-muted font-weight-normal">
              ({notes.length})
            </span>
          </h6>
        </div>

        <div
          id="collapseNotes"
          className="collapse show mh-200"
          aria-labelledby="headingNotes"
        >
          <div className="list-group">
            {notes.map(note => (
              <Item key={note.id} note={note} user={user} dispatch={dispatch} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.oneOfType([
    PropTypes.instanceOf(Contact),
    PropTypes.instanceOf(Company),
    PropTypes.instanceOf(Opportunity)
  ]),
  user: PropTypes.object.isRequired
};

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      inEdit: false,
      formState: props.note.originalProps
    };
  }

  _toggleOpenState = () => {
    if (!this.state.inEdit) {
      this.setState({
        open: !this.state.open
      });
    }
  };

  _toggleEditState = event => {
    event.stopPropagation();

    this.setState({
      inEdit: !this.state.inEdit
    });
  };

  _delete = () => {
    this.props.dispatch(deleteNote(this.state.formState));
  };

  _handleInputChange = event => {
    const { target } = event;

    this.state.formState.note = target.value;
  };

  _submit = () => {
    this.props.dispatch(saveNote(this.state.formState));

    this.setState({ inEdit: false });
  };

  render() {
    const { note } = this.props;

    // don't show private notes for other users
    if (note.private && note.user.id !== this.props.user.id) {
      return "";
    }

    return (
      <div
        className={`notes-partial ${
          this.state.inEdit ? "notes-partial-edit" : ""
        }`}
      >
        <div
          onClick={this._toggleOpenState}
          className={`list-group-item list-group-item-action align-items-start`}
        >
          <span className="mini-text text-muted float-right mt-1">
            {note.created_at.fromNow()}
          </span>
          {note.private ? (
            <span className="in-margin float-left text-muted">
              <MDIcons.MdLockOutline />
            </span>
          ) : (
            ""
          )}
          <p className="font-weight-bold">{note.user.name}</p>
          <div className="note">
            {this.state.open ? (
              <div className="note-content nl2br">
                {this.state.inEdit ? (
                  <div className="list-group-item-edit">
                    <ContentEditable
                      className="fh-5 my-2 p-1 border rounded"
                      name="note"
                      onChange={this._handleInputChange}
                      html={note.note}
                    />
                    <span className="mini-text my-2">
                      <a
                        href="javascript:void(0)"
                        className="text-muted pr-1"
                        onClick={this._toggleEditState}
                      >
                        Cancel
                      </a>
                      <a href="javascript:void(0)" onClick={this._submit}>
                        Save
                      </a>
                    </span>
                  </div>
                ) : (
                  <div className="list-group-item-view">
                    {note.note}
                    <a
                      href="javascript:void(0)"
                      className="mini-text d-block"
                      onClick={this._delete}
                    >
                      Delete
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="mini-text d-block"
                      onClick={this._toggleEditState}
                    >
                      Edit
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <TextTruncate line={3} truncateText="..." text={note.note} />
            )}
          </div>
          {note.document.id ? (
            <div className="attached-file">
              <a target="_blank" href={`/uploads/${note.document.filename}`}>
                {note.document.name}
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  user: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Notes;
