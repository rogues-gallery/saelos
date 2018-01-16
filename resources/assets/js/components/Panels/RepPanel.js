import React, { Component } from 'react';
import { Panel } from '../UI/Panel';
import Progress from "../UI/Progress";
import {connect} from "react-redux";
import { actionCreators } from "../../actions";
import Gravatar from 'react-gravatar';
import PropTypes from "prop-types";
import {customFieldsHelper} from "../../utils/helpers";
import * as types from "../../actions/types";
import EditRepForm from '../Forms/EditRepForm';
import NewRepForm from '../Forms/NewRepForm';

let _ = require('lodash');

class RepPanel extends Component {
    constructor(props) {
        super(props);

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._setFormState = this._setFormState.bind(this);
        this._togglePanelClass = this._togglePanelClass.bind(this);
        this._toggleContactClass = this._toggleContactClass.bind(this);
        this._toggleNoteClass = this._toggleNoteClass.bind(this);
        this._toggleHistoryClass = this._toggleHistoryClass.bind(this);

        this.state = {
            rep: props.rep
        }
    }

    _handleFormSubmit() {
        actionCreators.postUser(this.state.formState, this.props.dispatch);

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
        let exists = document.getElementById('rep-panel-wrapper').classList.toggle('rep-panel-open');

        if (!exists) {
            this.props.dispatch({
                type: types.CLEAR_REP_FOR_FLYOUT
            })
        }

        document.querySelector('body').classList.toggle('panel-open');

        this._handleFormSubmit();
    }

    _toggleContactClass() {
        document.getElementById('rep-panel-wrapper').classList.toggle('rep-contact-panel-open');
    }

    _toggleNoteClass() {
        document.getElementById('rep-panel-wrapper').classList.toggle('rep-note-panel-open');
    }

    _toggleHistoryClass() {
        document.getElementById('rep-panel-wrapper').classList.toggle('rep-history-panel-open');
    }

    render() {
        let customFields = customFieldsHelper(this.props.rep, this.props.customFields, this._handleInputChange);

        return (
            <div id="rep-panel-wrapper">
                <div className="rep-panel-overlay side-overlay" onClick={this._togglePanelClass} />
                <div className="rep-panel-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-avatar">
                                <Gravatar email={this.props.rep.email} />
                            </div>

                            <div className="panel-user-content">
                                {this.props.rep.name ? <div className="panel-user-name">{this.props.rep.name}</div> : ''}

                                <div className="panel-user-action" onClick={this._togglePanelClass}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                            <div className="panel-rep-score">
                                <Progress size={70}/>
                            </div>
                        </div>

                        <div className="panel-rep-details">
                            {this.props.rep.id ?
                                <EditRepForm rep={this.props.rep} setFormState={this._setFormState} />
                                :
                                <NewRepForm rep={this.props.rep} setFormState={this._setFormState} />
                            }
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}

RepPanel.propTypes = {
    rep: PropTypes.object.isRequired,
    customFields: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        rep: store.repFlyoutState.data,
        dataUpdated: store.repFlyoutState.dataUpdated,
        customFields: store.customFieldsState.repFields
    }
})(RepPanel);