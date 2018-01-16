import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import EditAccountForm from "../Forms/EditAccountForm";
import {actionCreators} from "../../actions";
import {connect} from "react-redux";
import NewAccountForm from "../Forms/NewAccountForm";
import PropTypes from 'prop-types';
import * as types from "../../actions/types";

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
        actionCreators.postAccount(this.state.formState, this.props.dispatch);

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

        document.querySelector('body').classList.toggle('panel-open');

        this._handleFormSubmit();
    }

    _toggleHistoryClass() {
        document.getElementById('account-panel-wrapper').classList.toggle('account-history-panel-open');
    }

    _toggleNoteClass() {
        document.getElementById('account-panel-wrapper').classList.toggle('account-edit-panel-open');
    }

    _toggleDocumentsClass() {
        document.getElementById('account-panel-wrapper').classList.toggle('account-contact-panel-open');
    }

    render() {
        return (
            <div id="account-panel-wrapper">
                <div className="account-side-overlay side-overlay" onClick={this._togglePanelClass} />
                <div className="account-panel-side side-panel">
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
                                        <i className="md-icon">note</i><br />
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
