import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Money } from 'react-format';
import { connect } from 'react-redux';
import * as types from "../../../actions/types";
import Gravatar from 'react-gravatar';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

class InfoboxOpportunity extends Component {
    constructor(props) {
        super(props);

        this._getNextStep = this._getNextStep.bind(this);
    }

    _togglePanelClass(data) {
        this.props.dispatch({
            type: types.FETCHING_OPPORTUNITY_FOR_FLYOUT_SUCCESS,
            data: data
        });

        document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-panel-open');
        document.querySelector('body').classList.toggle('panel-open');
    }

    _toggleContactPanel(data) {
        this.props.dispatch({
            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
            data: data
        });

        document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
        document.querySelector('body').classList.toggle('panel-open');
    }

    _getNextStep() {
        let nextStep = 'Unknown';

        _.map(this.props.opportunity.custom_fields, (field) => {
            console.log(field);
            if (field.custom_field_alias === 'next_step') {
                nextStep = field.value;
            }
        });

        return nextStep;
    }

    render() {
        let itemClass = 'infobox opportunity-item-' + this.props.opportunity.id;

        let contacts = Object.keys(this.props.opportunity.people).length ? this.props.opportunity.people.slice(0, 10).map((contact, index) => {
            let tooltipId = "opportunity-"+this.props.opportunity.id+"-contact-"+contact.id;
            let tooltipContent = contact.first_name + " " + contact.last_name;

            if (contact.position) {
                tooltipContent = tooltipContent + ", " + contact.position;
            }

            return <li key={index} onClick={this._toggleContactPanel.bind(this, contact)} className="avatar">
                <span data-tip data-for={tooltipId}>
                    <Gravatar email={contact.email} size={44} />
                </span>
                <ReactTooltip id={tooltipId}>
                    {tooltipContent}
                </ReactTooltip>
            </li>
        }) : [];

        let nextStep = this._getNextStep();

        return (
            <div className={itemClass}>
                <div className="infobox-inner">
                    <div className="infobox-header" onClick={this._togglePanelClass.bind(this, this.props.opportunity)}>
                        <div className="infobox-header-content">
                            <h3>{this.props.opportunity.name}</h3>
                        </div>
                    </div>

                    <div className="infobox-meta">
                        <div className="flex-row-nospace">
                            <div>
                                <span>Status</span>
                                <strong>{this.props.opportunity.status ? this.props.opportunity.status.name : ''}</strong>
                            </div>
                            <div>
                                <span>Amount</span>
                                <strong><Money>{this.props.opportunity.amount}</Money></strong>
                            </div>
                        </div>
                        <div>
                            <span>Next Step</span>
                            <p>{nextStep}</p>
                        </div>
                    </div>

                    <div className="infobox-content">
                        <div className="infobox-content-avatars">
                            <strong>Contacts:</strong>

                            <ul>
                                {contacts}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InfoboxOpportunity.propTypes = {
    opportunity: PropTypes.object.isRequired
};

export default connect()(InfoboxOpportunity)
