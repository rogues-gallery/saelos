import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import * as MDIcons from "react-icons/lib/md";
import _ from "lodash";
import Dropzone from "react-dropzone";
import Contact from "../../../contacts/Contact";
import Opportunity from "../../../opportunities/Opportunity";
import Company from "../../../companies/Company";
import { saveNote } from "../../../notes/service";

class NoteAction extends Component {
  constructor(props) {
    super(props);

    let note_name = "";
    let note_content = "";
    let opportunity_id = 0;
    let company_id = 0;
    let contact_id = 0;
    let isPrivate = 0;
    let doc = "";

    const note = _.find(props.model.notes, n => n.id === props.id);

    if (note) {
      note_name = note.name;
      note_content = note.note;
      isPrivate = note.private;
      doc = note.document;
    }

    this.state = {
      formState: {
        id: props.id,
        model: props.model,
        document: doc,
        private: isPrivate,
        note_name,
        note_content,
        opportunity_id,
        company_id,
        contact_id
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    let note_name = "";
    let note_content = "";
    let opportunity_id = 0;
    let company_id = 0;
    let contact_id = 0;
    let isPrivate = 0;
    let doc = "";

    const note = _.find(nextProps.model.notes, n => n.id === nextProps.id);

    if (note) {
      note_name = note.name;
      note_content = note.note;
      isPrivate = note.private;
      doc = note.document;
    }

    this.setState({
      formState: {
        id: nextProps.id,
        model: nextProps.model,
        document: doc,
        private: isPrivate,
        note_name,
        note_content,
        opportunity_id,
        company_id,
        contact_id
      }
    });
  }

  _handleInputChange = event => {
    const { target } = event;
    const { name, value } = target;
    const { formState } = this.state;

    formState[name] = value;

    this.setState({
      formState
    });
  };

  _handleContentChange = value => {
    const { formState } = this.state;

    formState.note_content = value;

    this.setState({
      formState
    });
  };

  _submit = () => {
    const { dispatch, toggle } = this.props;
    const { formState } = this.state;

    dispatch(saveNote(formState));

    toggle();
  };

  _cancel = () => {
    this.setState({
      formState: {
        model: this.props.model,
        document: "",
        private: 0,
        note_content: "",
        opportunity_id: null,
        company_id: null,
        contact_id: null
      }
    });

    this.props.toggle();
  };

  _togglePrivate = e => {
    const { formState } = this.state;

    // We're toggling state, so if it is private, change
    formState.private = formState.private ? 0 : 1;

    this.setState({
      formState
    });
  };

  _onDrop = (acceptedFiles, rejectedFiles) => {
    const { formState } = this.state;

    formState.document = acceptedFiles[0];

    this.setState({
      formState
    });
  };

  render() {
    const { formState } = this.state;
    const { document } = formState;

    return (
      <React.Fragment>
        <div className="card-body noteActionView">
          <div className="float-right mb-2">
            <div className="mini-text font-weight-bold">
              <a
                href="javascript:void(0)"
                className={`btn btn-sm btn-link ${
                  formState.private ? "text-dark" : "text-muted"
                }`}
                onClick={this._togglePrivate}
              >
                <MDIcons.MdLockOutline />
              </a>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="note_content">
              {this.context.i18n.t("messages.note")}
            </label>
            <ReactQuill
              name="note_content"
              className="fh-200"
              onChange={this._handleContentChange}
              value={formState.note_content}
            />
          </div>
          <div className="mt-2">
            <button className="btn btn-primary mr-2" onClick={this._submit}>
              {this.context.i18n.t("messages.save")}
            </button>
            <button className="btn btn-link text-muted" onClick={this._cancel}>
              {this.context.i18n.t("messages.cancel")}
            </button>

            <div className="float-right mr-2">
              {document ? (
                <div className="attached-file">
                  <a target="_blank" href={document.preview}>
                    {document.name}
                  </a>
                </div>
              ) : (
                ""
              )}

              <Dropzone
                onDrop={this._onDrop}
                className="document-dropzone"
                activeClassName="active"
                acceptClassName="accept"
                rejectClassName="reject"
                accept="image/jpeg, image/jpg, text/csv, application/json, application/pdf, application/zip, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword"
              >
                <button className="btn btn-link btn-xs">
                  <span className="h5">
                    <MDIcons.MdAttachFile />
                  </span>
                </button>
              </Dropzone>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NoteAction.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.oneOfType([
    PropTypes.instanceOf(Contact),
    PropTypes.instanceOf(Company),
    PropTypes.instanceOf(Opportunity)
  ]),
  id: PropTypes.number
};

NoteAction.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default connect()(NoteAction);
