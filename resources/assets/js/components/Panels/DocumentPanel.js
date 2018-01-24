import React, { Component } from 'react';

import { Panel } from '../UI/Panel';
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import Progress from "../UI/Progress";
import { uploadFile } from "../../utils/fetch";
import {connect} from "react-redux";

class DocumentPanel extends Component {
    constructor(props) {
        super(props);

        this._togglePanelClass = this._togglePanelClass.bind(this);
        this._onDrop = this._onDrop.bind(this);
    }

    _togglePanelClass() {
        document.getElementById(this.props.targetParentPanel).classList.toggle('document-panel-open');
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

    render() {

        let docs = _.map(this.props.documents, (doc, index) => {
            let after = doc.user.name + ' on ' + doc.created_at;

            return <div key={index} className="note">
                <h4 className="note-title">{doc.name}</h4>
                <small>{after}</small>
                <a href={"/uploads/" + doc.filename}>View file</a>
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
                                <Dropzone onDrop={this._onDrop}>
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