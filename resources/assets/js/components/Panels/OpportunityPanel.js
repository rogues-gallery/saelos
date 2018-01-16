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
            opportunity: props.opportunity
        }
    }

    _handleFormSubmit() {
        actionCreators.postOpportunity(this.state.formState, this.props.dispatch);

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

        document.querySelector('body').classList.toggle('panel-open');

        this._handleFormSubmit();
    }

    _toggleHistoryClass() {
        document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-history-panel-open');
    }

    _toggleNoteClass() {
        document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-edit-panel-open');
    }

    _toggleDocumentsClass() {
        document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-contact-panel-open');
    }

    render() {
        return (
            <div id="opportunity-panel-wrapper">
                <div className="opportunity-side-overlay side-overlay" onClick={this._toggleBodyClass} />
                <div className="opportunity-panel-side side-panel">
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
                                <EditOpportunityForm opportunity={this.props.opportunity} setFormState={this._setFormState} />
                            :
                                <NewOpportunityForm opportunity={this.props.opportunity} setFormState={this._setFormState} />
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
                <HistoryPanel contact={this.props.opportunity} dispatch={this.props.dispatch} />
                <NotePanel contact={this.props.opportunity} dispatch={this.props.dispatch} />
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
        opportunity: store.opportunityFlyoutState.data
    }
})(OpportunityPanel);
