import React from 'react'
import PropTypes from 'prop-types'
import { fetchOpportunity } from "../../opportunities/service"
import * as MDIcons from 'react-icons/lib/md'


class Opportunities extends React.Component {
  render() {
    const { opportunities, dispatch } = this.props;
    return (
  <div className="card">
    <div className="card-header" id="headingOpportunities">
      <h6 className="mb-0" data-toggle="collapse" data-target="#collapseOpportunities" aria-expanded="true" aria-controls="collapseOpportunities">
        <MDIcons.MdKeyboardArrowDown /> Opportunities <span className="text-muted font-weight-normal">({opportunities.length})</span>
      </h6>
    </div>

    <div id="collapseOpportunities" className="collapse show mh-200" aria-labelledby="headingOpportunities">
      <div className="list-group border-bottom">
        {opportunities.map(opportunity => <Opportunity key={opportunity.id} opportunity={opportunity} router={this.context.router} dispatch={dispatch} />)}
      </div>
    </div>
  </div>
)}
}

const Opportunity = ({ opportunity, dispatch, router }) => {
  const openOpportunityRecord = (id) => {
    dispatch(fetchOpportunity(opportunity.id))
    router.history.push(`/opportunities/${id}`)
  }

  return (
    <div onClick={() => openOpportunityRecord(opportunity.id)} className="list-group-item list-group-item-action align-items-start">
      <p className="mini-text text-muted float-right">Stage</p>
      <p><strong>{opportunity.name}</strong>
      <br />Company Name</p>
      
    </div>
  );
}


Opportunities.propTypes = {
  opportunities: PropTypes.array.isRequired
}

Opportunities.contextTypes = {
  router: PropTypes.object
}

export default Opportunities