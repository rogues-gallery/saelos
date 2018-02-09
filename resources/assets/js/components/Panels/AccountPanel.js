import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import EditAccountForm from "../Forms/EditAccountForm";
import {actionCreators} from "../../actions";
import {connect} from "react-redux";
import NewAccountForm from "../Forms/NewAccountForm";
import PropTypes from 'prop-types';
import * as types from "../../actions/types";
import NotePanel from './NotePanel';
import HistoryPanel from './HistoryPanel';
import DocumentPanel from './DocumentPanel';

class AccountPanel extends Component {
    constructor(props) {
        super(props);

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._setFormState = this._setFormState.bind(this);
        this._togglePanelClass = this._togglePanelClass.bind(this);
        this._toggleNoteClass = this._toggleNoteClass.bind(this);
        this._toggleHistoryClass = this._toggleHistoryClass.bind(this);
        this._toggleDocumentsClass = this._toggleDocumentsClass.bind(this);

        this.state = {
            account: props.account
        }
    }

    _handleFormSubmit() {
        this.props.dispatch(actionCreators.postAccount(this.state.formState));

        this.setState({
            formState: {}
        })
    }

    _setFormState(data) {
        this.setState({
            formState: data
        })
    }

    _togglePanelClass() {
        let exists = document.getElementById('account-panel-wrapper').classList.toggle('account-panel-open');

        if (!exists) {
            this.props.dispatch({
                type: types.CLEAR_ACCOUNT_FOR_FLYOUT
            })
        }

        // Clear all inputs after submit
        document.getElementById('account-panel-wrapper')
            .querySelectorAll('input').forEach((child) => { child.value = null; });

        document.querySelector('body').classList.toggle('panel-open');

        this._handleFormSubmit();
    }

    _toggleHistoryClass() {
        document.getElementById('account-panel-wrapper').classList.toggle('history-panel-open');
    }

    _toggleNoteClass() {
        this.props.dispatch({
            type: types.SET_NOTES_FOR_FLYOUT,
            data: this.props.account.notes,
            entityId: this.props.account.id,
            entityType: 'App\\Company'
        });

        document.getElementById('account-panel-wrapper').classList.toggle('note-panel-open');
    }

    _toggleDocumentsClass() {
        this.props.dispatch({
            type: types.SET_DOCUMENTS_FOR_FLYOUT,
            data: this.props.account.documents,
            entityId: this.props.account.id,
            entityType: 'App\\Company'
        });

        document.getElementById('account-panel-wrapper').classList.toggle('document-panel-open');
    }

    render() {
        return (
            <div id="account-panel-wrapper">
                <div className="account-side-overlay side-overlay" onClick={this._togglePanelClass} />
                <div className="account-side side-panel">
                    <Panel>
                        {this.props.account.id ?
                            <div className="panel-user">
                                <div className="panel-user-content">
                                    {this.props.account.name ? <div className="panel-user-name">{this.props.account.name}</div> : ''}
                                    {this.props.account.client_name ? <div className="panel-user-subtitle">{this.props.account.client_name}</div> : ''}

                                    <div className="panel-user-action" onClick={this._togglePanelClass}>
                                        <i className="md-icon">close</i>
                                    </div>
                                </div>
                                <div className="panel-user-score">
                                    <Progress size={80} />
                                </div>
                                <div className="panel-user-available-actions">
                                    <div className="user-action-box" onClick={this._toggleHistoryClass}>
                                        <i className="md-icon">search</i><br />
                                        History
                                    </div>
                                    <div className="user-action-box" onClick={this._toggleNoteClass}>
                                        <i className="md-icon">event_note</i><br />
                                        Notes
                                    </div>
                                    <div className="user-action-box" onClick={this._toggleDocumentsClass}>
                                        <i className="md-icon">chat_bubble_outline</i><br />
                                        Documents
                                    </div>
                                </div>
                            </div>
                        :
                            <div className="panel-user">
                                <div className="panel-user-content">
                                    <div className="panel-user-name">Create Account</div>
                                    <div className="panel-user-action" onClick={this._togglePanelClass}>
                                        <i className="md-icon">close</i>
                                    </div>
                                </div>
                                <div className="panel-user-score">
                                    <Progress size={0}/>
                                </div>
                            </div>
                        }

                        <div className="panel-account-details">
                            {this.props.account.id ?
                                <EditAccountForm account={this.props.account} setFormState={this._setFormState} />
                            :
                                <NewAccountForm account={this.props.account} setFormState={this._setFormState} />
                            }
                        </div>
                        {this.props.account.id ?
                            <div className="panel-actions">
                                <strong>Recommended Action</strong>
                                <p>Wait <strong>2 days</strong> before taking next step.</p>
                            </div>
                        : ''}
                    </Panel>
                </div>
                <HistoryPanel activities={this.props.account.activities ? this.props.account.activities : []} targetParentPanel="account-panel-wrapper" />
                <NotePanel itemId={this.props.account.id ? this.props.account.id : 0} addNoteFunc={actionCreators.addAccountNote} targetParentPanel="account-panel-wrapper" />
                <DocumentPanel itemId={this.props.account.id ? this.props.account.id : 0} documents={this.props.account.documents ? this.props.account.documents : []} targetParentPanel="account-panel-wrapper" />
            </div>
        );
    }
}

AccountPanel.propTypes = {
    account: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        account: store.accountFlyoutState.data
    }
})(AccountPanel);
