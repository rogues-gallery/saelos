import React from 'react';
import PropTypes from 'prop-types';
import { fetchOpportunities, fetchOpportunity } from "../service";
import Record from './panels/record';

const Page = ({ opportunities, dispatch }) => ([
    <List opportunities={opportunities} dispatch={dispatch} />,
    <Record />
])

class List extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchOpportunities())
  }

  render() {
    return (
      <div className="container col-sm-2 col-md-3 list-panel offset-md-2">
        <div className="position-fixed">
          <form>
            <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{position:"relative", verticalAlign:"top"}} />
          </form>
        </div>
        <div className="list-group">
          {this.props.opportunities.map(opportunity => <Opportunity key={opportunity.id} opportunity={opportunity} dispatch={this.props.dispatch} router={this.context.router} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  opportunities: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

List.contextTypes = {
  router: PropTypes.object
}

const Opportunity = ({ opportunity, dispatch, router }) => {
  const openOpportunityRecord = (id) => {
    dispatch(fetchOpportunity(opportunity.id))
    router.history.push(`/opportunities/${id}`)
  }

  return (
    <div onClick={() => openOpportunityRecord(opportunity.id)} className={`list-group-item list-group-item-action flex-column align-items-start ${opportunity.id === parseInt(router.route.match.params.id) ? ' active' : ''}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{opportunity.name}</h5>
        <small className="text-muted">3 days ago</small>
      </div>
      <p className="mb-1">{opportunity.position}</p>
      <small className="text-muted">Some Text</small>
    </div>
  );
}

Opportunity.propTypes = {
  opportunity: PropTypes.object.isRequired
};

export default Page;