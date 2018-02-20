import React, { Component } from 'react';

import { Panel } from '../UI/Panel';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import Progress from "../UI/Progress";
import fetch, { uploadFile } from "../../utils/fetch";
import { connect } from "react-redux";
import { togglePanelById } from "../../utils/helpers";

class DocumentPanel extends Component {
    constructor(props) {
        super(props);

        this._togglePanelClass = this._togglePanelClass.bind(this);
        this._onDrop = this._onDrop.bind(this);
    }

    _togglePanelClass() {
        togglePanelById(this.props.targetParentPanel, 'document-panel-open');
    }

    _onDrop(acceptedFiles, rejectedFiles) {
        let uploadUrl = '';

        switch(this.props.targetParentPanel) {
            case 'opportunity-panel-wrapper':
                uploadUrl = '/deals/' + this.props.itemId + '/documents';
                break;
            case 'account-panel-wrapper':
                uploadUrl = '/companies/' + this.props.itemId + '/documents';
                break;
        }

        if (!uploadUrl) {
            return false;
        }

        console.log(acceptedFiles);

        uploadFile(uploadUrl, acceptedFiles[0], 'document')
            .then((response) => {
                console.log(response);
            });
    }

    _downloadDocument(doc) {
        let downloadUrl = '';

        switch (this.props.targetParentPanel) {
            case 'opportunity-panel-wrapper':
                downloadUrl = '/deals/' + this.props.itemId + '/documents/' + doc.id;
                break;
            case 'account-panel-wrapper':
                downloadUrl = '/companies/' + this.props.itemId + '/documents/' + doc.id;
                break;
        }

        fetch(downloadUrl);
    }

    render() {
        let docs = _.map(this.props.documents, (doc, index) => {
            let after = doc.user.name + ' on ' + doc.created_at;
            let icon = '';

            switch (doc.mimetype) {
                case 'application/pdf':
                    icon = 'picture_as_pdf';
                    break;
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                    icon = 'image';
                    break;
                default:
                    icon = 'insert_drive_file';
                    break;
            }

            return <div key={index} className="document">
                <h4 className="note-title">
                    <i className="md-icon">{icon}</i>{doc.name}
                    <br /><small>{after}</small>
                </h4>
                <p>
                    <span className="button button-primary" onClick={this._downloadDocument.bind(this, doc)}>
                        <i className="md-icon">cloud_download</i>
                        Download
                    </span>
                </p>
            </div>
        });

        return (
            <div>
                <div className="document-overlay side-overlay" onClick={this._togglePanelClass} />
                <div className="document-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                <div className="panel-user-name">Documents</div>
                                <div className="panel-user-subtitle">Relevant documents.</div>

                                <div className="panel-user-action" onClick={this._togglePanelClass}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                            <div className="panel-user-score">
                                <Progress size={0}/>
                            </div>
                        </div>

                        <div className="panel-contact-details">
                            <div className="document-form">
                                <h2>Add Document</h2>
                                <Dropzone
                                    onDrop={this._onDrop}
                                    className="document-dropzone"
                                    activeClassName="active"
                                    acceptClassName="accept"
                                    rejectClassName="reject"
                                    accept="image/jpeg, image/jpg, text/csv, application/json, application/pdf, application/zip, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword"
                                >
                                    <p>Drag and drop a file here, or click to select files to upload.</p>
                                </Dropzone>
                            </div>
                            <div className="document-container">
                                <h2>Documents</h2>
                                {docs}
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}

DocumentPanel.propTypes = {
    targetParentPanel: PropTypes.string.isRequired,
    documents: PropTypes.array.isRequired,
    itemId: PropTypes.number.isRequired
}

export default connect((store) => {
    return {
        documents: store.documentsState.data,
        dataAppended: store.documentsState.dataAppended,
        dataUpdated: store.documentsState.dataUpdated,
        user: store.authState.user
    }
})(DocumentPanel);