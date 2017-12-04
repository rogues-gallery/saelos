import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { connect } from 'react-redux';
import { actionCreators } from '../../actions';
import Loading from '../Helpers/Loading';
import { InfoboxOpportunity } from "../UI/Infobox";
import diff from "recursive-diff";

class Opportunities extends Component {
    componentWillMount() {
     this.props.dispatch(actionCreators.fetchOpportunities());
    }

    shouldComponentUpdate(nextProps) {
        let changed = diff.getDiff(this.props.opportunities, nextProps.opportunities);

        return JSON.stringify(changed) !== '{}';
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchOpportunities(page.selected + 1));
    }

    render() {
        let results = this.props.opportunities.map((opportunity) => {
            return <InfoboxOpportunity key={opportunity.id} opportunity={opportunity} />
        });

        return (
            this.props.isFetching ? <Backend><Loading /></Backend> :
            <Backend>
                <div className="content-inner">
                    <div className="opportunities flex-row-even">
                        {results}
                    </div>
                </div>
            </Backend>
        );
    }
}

Opportunities.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    opportunities: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        opportunities: store.opportunityState.data,
        pagination: store.opportunityState.pagination,
        isFetching: store.opportunityState.isFetching
    };
})(Opportunities)
