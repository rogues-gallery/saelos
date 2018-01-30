import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { actionCreators } from '../../actions';
import * as types from "../../actions/types";
import Filter from '../Helpers/Filter';
import OpportunitiesList from '../Lists/OpportunitiesList';

class Opportunities extends Component {

    constructor(props) {
        super(props);

        this._toggleNewPanel = this._toggleNewPanel.bind(this);
    }

    _toggleNewPanel() {
        document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-panel-open');
        document.querySelector('body').classList.toggle('panel-open');

        // Set the form state for a new contact
        this.props.dispatch({
            type: types.FETCHING_OPPORTUNITY_FOR_FLYOUT_SUCCESS,
            data: {
                custom_fields: []
            }
        });
    }

    render() {
        let filterFields = {
            name: null,
            amount: null
        };

        return (
            <Backend>
                <div className="content-inner">
                    <div className="content-top flex-row-even">
                        <Filter onInputChange={actionCreators.fetchOpportunities} filterFields={filterFields} type="opportunities" />
                        <div className="content-top-buttons">
                            <span className="create-button button button-primary" onClick={this._toggleNewPanel}>
                               <span>Create Opportunity</span>
                            </span>
                        </div>
                    </div>

                    <OpportunitiesList/>
                </div>
            </Backend>
        );
    }
}

Opportunities.propTypes = {
    dispatch: PropTypes.func
};

export default connect()(Opportunities)
