import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import EditOpportunityForm from "../Forms/EditOpportunityForm";
import {actionCreators} from "../../actions";
import {connect} from "react-redux";
import NewOpportunityForm from "../Forms/NewOpportunityForm";

class OpportunityPanel extends Component {
    constructor(props) {
        super(props);

        this._getContainerClass = this._getContainerClass.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._setFormState = this._setFormState.bind(this);
        this._togglePanelClass = this._togglePanelClass.bind(this);
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

    _getContainerClass() {
        return 'div.opportunity-item-' + this.props.opportunity.id;
    }

    _togglePanelClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('opportunity-panel-open');

        this._handleFormSubmit();
    }

    _toggleHistoryClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('opportunity-history-panel-open');
    }

    _toggleNoteClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('opportunity-edit-panel-open');
    }

    _toggleDocumentsClass() {
        document.querySelector(this._getContainerClass()).classList.toggle('opportunity-contact-panel-open');
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="opportunity-side-overlay side-overlay" onClick={this._togglePanelClass} />
                <div className="opportunity-panel-side side-panel">
                    <Panel>
                        {this.props.opportunity.id !== 'new' ?
                            <div className="panel-user">
                                <div className="panel-user-content">
                                    {this.props.opportunity.name ? <div className="panel-user-name">{this.props.opportunity.name}</div> : ''}

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
                                    <div className="panel-user-name">Create Opportunity</div>
                                    <div className="panel-user-action" onClick={this._togglePanelClass}>
                                        <i className="md-icon">close</i>
                                    </div>
                                </div>
                                <div className="panel-user-score">
                                    <Progress size={0}/>
                                </div>
                            </div>
                        }

                        <div className="panel-opportunity-details">
                            {this.props.opportunity.id === 'new' ?
                                <NewOpportunityForm opportunity={this.props.opportunity} setFormState={this._setFormState} />
                            :
                                <EditOpportunityForm opportunity={this.props.opportunity} setFormState={this._setFormState} />
                            }
                        </div>
                        {this.props.opportunity.id !== 'new' ?
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

export default connect()(OpportunityPanel);
