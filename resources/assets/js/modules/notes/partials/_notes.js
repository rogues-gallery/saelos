import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as MDIcons from "react-icons/lib/md";
import Note from "../Note";
import Truncate from "react-truncate-html";
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
            <strong>{this.context.i18n.t("messages.add")}</strong>
          </a>
          <h6
            className="mb-0"
            data-toggle="collapse"
            data-target="#collapseNotes"
            aria-expanded="true"
            aria-controls="collapseNotes"
          >
            <MDIcons.MdKeyboardArrowDown />{" "}
            {this.context.i18n.t("messages.note_plural")}
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
              <Item
                key={note.id}
                note={note}
                user={user}
                model={model}
                dispatch={dispatch}
              />
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

Notes.contextTypes = {
  i18n: PropTypes.object.isRequired
};

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
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

  _edit = () => {
    const { dispatch, note, model } = this.props;

    dispatch(openTaskContainer(model, "note", note.id));
  };

  _delete = () => {
    this.props.dispatch(deleteNote(this.state.formState));
  };

  _submit = () => {
    this.props.dispatch(saveNote(this.state.formState));

    this.setState({ inEdit: false });
  };

  render() {
    const { note } = this.props;

    // don't show private notes for other users
    if (note.private && note.user.id !== this.props.user.id) {
      return null;
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
          ) : null}
          <p className="font-weight-bold">{note.user.name}</p>
          <div className="note">
            {this.state.open ? (
              <div className="note-content nl2br">
                <div className="list-group-item-view">
                  <div dangerouslySetInnerHTML={{ __html: note.note }} />
                  <span className="my-2">
                    <a
                      href="javascript:void(0)"
                      className="btn btn-small btn-link btn-text mini-text mr-2"
                      onClick={this._edit}
                    >
                      {this.context.i18n.t("messages.edit")}
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="btn btn-small btn-link mini-text"
                      onClick={this._delete}
                    >
                      {this.context.i18n.t("messages.delete")}
                    </a>
                  </span>
                </div>
              </div>
            ) : (
              <Truncate
                lines={3}
                dangerouslySetInnerHTML={{ __html: note.note }}
              />
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

Item.propTypes = {
  user: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.oneOfType([
    PropTypes.instanceOf(Contact),
    PropTypes.instanceOf(Company),
    PropTypes.instanceOf(Opportunity)
  ])
};

Item.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default connect()(Notes);
