import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import EditOpportunityForm from "../Forms/EditOpportunityForm";
import {actionCreators} from "../../actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import NewOpportunityForm from "../Forms/NewOpportunityForm";
import * as types from "../../actions/types";
import HistoryPanel from './HistoryPanel';
import NotePanel from './NotePanel';
import DocumentPanel from './DocumentPanel';

class OpportunityPanel extends Component {
    constructor(props) {
        super(props);

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._setFormState = this._setFormState.bind(this);
        this._toggleBodyClass = this._toggleBodyClass.bind(this);
        this._toggleNoteClass = this._toggleNoteClass.bind(this);
        this._toggleHistoryClass = this._toggleHistoryClass.bind(this);
        this._toggleDocumentsClass = this._toggleDocumentsClass.bind(this);

        this.state = {
            opportunity: props.opportunity,
            formState: props.opportunity
        }
    }

    _handleFormSubmit() {
        this.props.dispatch(actionCreators.postOpportunity(this.state.formState));

        this.setState({
            formState: {}
        })
    }

    _setFormState(data) {
        this.setState({
            formState: data
        })
    }

    _toggleBodyClass() {
        let exists = document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-panel-open');

        if (!exists) {
            this.props.dispatch({
                type: types.CLEAR_OPPORTUNITY_FOR_FLYOUT
            })
        }

        // Clear all inputs after submit
        document.getElementById('opportunity-panel-wrapper')
            .querySelectorAll('input').forEach((child) => { child.value = null; });

        // If this was opened from the contact panel, remove the class when closing it
        if (document.getElementById('contact-panel-wrapper').classList.contains('opportunity-panel-open')) {
            document.getElementById('contact-panel-wrapper').classList.remove('opportunity-panel-open')
        }

        document.querySelector('body').classList.toggle('panel-open');

        this._handleFormSubmit();
    }

    _toggleHistoryClass() {
        document.getElementById('opportunity-panel-wrapper').classList.toggle('history-panel-open');
    }

    _toggleNoteClass() {
        this.props.dispatch({
            type: types.SET_NOTES_FOR_FLYOUT,
            data: this.props.opportunity.notes,
            entityId: this.props.opportunity.id,
            entityType: 'App\\Deal'
        });

        document.getElementById('opportunity-panel-wrapper').classList.toggle('note-panel-open');
    }

    _toggleDocumentsClass() {
        this.props.dispatch({
            type: types.SET_DOCUMENTS_FOR_FLYOUT,
            data: this.props.opportunity.documents,
            entityId: this.props.opportunity.id,
            entityType: 'App\\Deal'
        });

        document.getElementById('opportunity-panel-wrapper').classList.toggle('document-panel-open');
    }

    render() {
        return (
            <div id="opportunity-panel-wrapper">
                <div className="opportunity-side-overlay side-overlay" onClick={this._toggleBodyClass} />
                <div className="opportunity-side side-panel">
                    <Panel>
                        {this.props.opportunity.id ?
                            <div className="panel-user">
                                <div className="panel-user-content">
                                    {this.props.opportunity.name ? <div className="panel-user-name">{this.props.opportunity.name}</div> : ''}

                                    <div className="panel-user-action" onClick={this._toggleBodyClass}>
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
                                    <div className="panel-user-name">Create Opportunity</div>
                                    <div className="panel-user-action" onClick={this._toggleBodyClass}>
                                        <i className="md-icon">close</i>
                                    </div>
                                </div>
                                <div className="panel-user-score">
                                    <Progress size={0}/>
                                </div>
                            </div>
                        }

                        <div className="panel-opportunity-details">
                            {this.props.opportunity.id ?
                                <EditOpportunityForm setFormState={this._setFormState} />
                            :
                                <NewOpportunityForm setFormState={this._setFormState} />
                            }
                        </div>
                        {this.props.opportunity.id ?
                            <div className="panel-actions">
                                <strong>Recommended Action</strong>
                                <p>Wait <strong>2 days</strong> before taking next step.</p>
                            </div>
                        : ''}
                    </Panel>
                </div>
                <HistoryPanel activities={this.props.opportunity.activities ? this.props.opportunity.activities : []} targetParentPanel="opportunity-panel-wrapper" />
                <NotePanel itemId={this.props.opportunity.id ? this.props.opportunity.id : 0} addNoteFunc={actionCreators.addOpportunityNote} notes={this.props.opportunity.notes ? this.props.opportunity.notes : []} targetParentPanel="opportunity-panel-wrapper" />
                <DocumentPanel itemId={this.props.opportunity.id ? this.props.opportunity.id : 0} documents={this.props.opportunity.documents ? this.props.opportunity.documents : []} targetParentPanel="opportunity-panel-wrapper" />
            </div>
        );
    }
}

OpportunityPanel.propTypes = {
    dispatch: PropTypes.func.isRequired,
    opportunity: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        opportunity: store.opportunityFlyoutState.data,
        dataUpdated: store.opportunityFlyoutState.dataUpdated
    }
})(OpportunityPanel);
