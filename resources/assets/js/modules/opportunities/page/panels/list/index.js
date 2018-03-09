import React from 'react';
import PropTypes from 'prop-types';
import { fetchOpportunities, fetchOpportunity } from "../../../service";


class List extends React.Component {
  componentWillMount() {
    if (this.props.opportunities.length === 0) {
      this.props.dispatch(fetchOpportunities()) 
    }
  }

  render() {
    const { opportunities, dispatch, searchString } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || opportunities[0].id
    
    return (
      <div className="col list-panel border-right">
          <div className="px-4 pt-4 bg-white border-bottom">
            <form>
              <input
              type="search"
              className="form-control ds-input"
              id="search-input"
              placeholder="Search..."
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0"
              dir="auto"
              style={{position:"relative", verticalAlign:"top"}}
              />            </form>
            <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Active</b></div> <div className="text-muted col"><b>All</b></div></div>
          </div>
        <div className="list-group h-scroll">
          {opportunities.map(opportunity => <Opportunity key={opportunity.id} opportunity={opportunity} dispatch={this.props.dispatch} router={this.context.router} activeID={activeIndex} />)}
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

const Opportunity = ({ opportunity, dispatch, router, activeID }) => {
  const openOpportunityRecord = (id) => {
    dispatch(fetchOpportunity(opportunity.id))
    router.history.push(`/opportunities/${id}`)
  }

  return (
    <div onClick={() => openOpportunityRecord(opportunity.id)} 
    className={`list-group-item list-group-item-action align-items-start ${opportunity.id === parseInt(activeID) ? ' active' : ''}`}>
      <h6>{opportunity.name}</h6>
      <p>Company Name</p>
      <p className="text-muted">Opportunity Status</p>
    </div>
  );
}

Opportunity.propTypes = {
  opportunity: PropTypes.object.isRequired
};

export default List