import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Money } from 'react-format';
import { connect } from 'react-redux';
import * as types from "../../../actions/types";

class InfoboxOpportunity extends Component {
    _togglePanelClass(data) {
        this.props.dispatch({
            type: types.FETCHING_OPPORTUNITY_FOR_FLYOUT_SUCCESS,
            data: data
        });

        document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-panel-open');
        document.querySelector('body').classList.toggle('panel-open');
    }

    render() {
        let itemClass = 'infobox opportunity-item-' + this.props.opportunity.id;

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
                        </div>
                    </div>

                    <div className="infobox-content">
                        <div className="infobox-content-avatars">
                            <strong>Contacts:</strong>

                            <ul>
                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-1.jpg)'}}></span>
                                </li>

                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-2.jpg)'}}></span>
                                </li>

                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-3.jpg)'}}></span>
                                </li>

                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-4.jpg)'}}></span>
                                </li>

                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-5.jpg)'}}></span>
                                </li>
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
