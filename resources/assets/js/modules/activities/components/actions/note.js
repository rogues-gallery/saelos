import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import * as MDIcons from "react-icons/lib/md";
import Dropzone from "react-dropzone";
import Contact from "../../../contacts/Contact";
import Opportunity from "../../../opportunities/Opportunity";
import Company from "../../../companies/Company";
import { saveNote } from "../../../notes/service";

class NoteAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: {
        model: props.model,
        document: "",
        private: 0,
        note_name: "",
        note_content: "",
        opportunity_id: null,
        company_id: null,
        contact_id: null
      }
    };
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
    console.log(formState);

    dispatch(saveNote(formState));

    toggle();
  };

  _cancel = () => {
    this.setState({
      formState: {
        model: this.props.model,
        document: "",
        private: 0,
        note_name: "",
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
            <label htmlFor="note_name">Name</label>
            <input
              type="text"
              onChange={this._handleInputChange}
              value={formState.note_name}
              name="note_name"
              className="form-control"
              placeholder="Enter note name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="note_content">Note</label>
            <ReactQuill
              name="note_content"
              className="fh-200"
              onChange={this._handleContentChange}
            />
          </div>
          <div className="mt-2">
            <button className="btn btn-primary mr-2" onClick={this._submit}>
              Save
            </button>
            <button className="btn btn-link text-muted" onClick={this._cancel}>
              Cancel
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
  ])
};

export default connect()(NoteAction);
