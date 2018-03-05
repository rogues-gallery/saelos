import React from 'react';
import PropTypes from 'prop-types';
import { fetchOpportunities, fetchOpportunity } from "../../service";

class Page extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchOpportunities())
  }

  render() {
    return (
      <div className="container">
        {this.props.opportunities.map(opportunity => <Opportunity key={opportunity.id} opportunity={opportunity} dispatch={this.props.dispatch} />)}
      </div>
    )
  }
}

Page.propTypes = {
  opportunities: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const Opportunity = ({ opportunity, dispatch }) => {
  return (
    <div className="opportunity" onClick={() => dispatch(fetchOpportunity(opportunity.id))}>
      {opportunity.name}
    </div>
  );
}

Opportunity.propTypes = {
  opportunity: PropTypes.object.isRequired
};

export default Page;