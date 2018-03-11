import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'

import Contacts from '../../../../contacts/partials/_contacts'
import Notes from '../../../../notes/partials/_notes'
import Opportunity from '../../../Opportunity'
import {getFirstOpportunityId, getOpportunity} from '../../../store/selectors'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "default"
    }

    this._toggleView = this._toggleView.bind(this)

  }

  _toggleView(view) {
    this.setState({view: view})
  }

  render() {
    const {opportunity, dispatch, user} = this.props

    const data = {series: [[null, null, null, 1, 1], [1, 1, 1, 1,null]] }
    const options = {
            low: 0,
            high: 2,
            fullWidth: true,
            height: "50px",
            showArea: false, 
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          }


    switch(this.state.view) {
      case 'default':
        return <Details opportunity={opportunity} dispatch={dispatch} toggle={this._toggleView} user={user} data={data} options={options} />
      case 'history':
        return <History activities={opportunity.activities} dispatch={dispatch}  toggle={this._toggleView} />
    }
  }
}

const Details = ({opportunity, dispatch, toggle, user, data, options}) => (
  <div key={1} className="col detail-panel border-left">
    <div className="border-bottom text-center py-2 heading">
      <h5>Opportunity Details</h5>
    </div>
    <div className="h-scroll">
      <div className="card ct-container-inverse">
        <div className="card-header" id="headingOutcome">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseOutcome" aria-expanded="true" aria-controls="collapseOutcome">
            <MDIcons.MdKeyboardArrowDown /> Opportunity Outcome
          </h6>
        </div>

        <div id="collapseOutcome" className="collapse show" aria-labelledby="headingOutcome">
          <div className="card-body border-bottom">
            <div className="h1 text-center">$22,500</div>
            <div className="text-center mini-text text-muted text-uppercase pb-2"><MDIcons.MdAccessTime /> EST <span className="text-dark">7 days</span> to close</div>
            <OpportunityTimeline data={data} options={options} type="Line" />
            <div className="mini-text text-muted font-weight-bold text-uppercase mt-2">Next Stage</div>
            <p>Closed Won: 100%</p>
          </div>
        </div>
      </div>
      <Contacts contacts={opportunity.contacts} dispatch={dispatch} />
      <Notes notes={opportunity.notes} dispatch={dispatch} entityType="App\Deal" entityId={opportunity.id} user={user} />
    </div>
  </div>
)

const History = ({activities, dispatch, toggle}) => (
  <div key={1} className="col detail-panel border-left">
    <div className="border-bottom text-center py-2 heading">
      <div className="dropdown justify-content-center">
        <div className="mt-2 h5 dropdown-toggle" id="detailViewToggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">History</div>
        <div className="dropdown-menu" aria-labelledby="detailViewToggle">
          <div className="dropdown-item" onClick={() => toggle('default')}>Details</div>
          <div className="dropdown-item disabled">History</div>
        </div>
      </div>
    </div>
  </div>
)

const OpportunityTimeline = ({data, options, type}) => {
  return (
    <ChartistGraph data={data} options={options} type={type} className="opportunity-timeline" />
  )
}

Detail.propTypes = {
  opportunity: PropTypes.instanceOf(Opportunity).isRequired,
  user: PropTypes.object.isRequired
}
export default withRouter(connect((state, ownProps) => ({
  opportunity: getOpportunity(state, ownProps.match.params.id || getFirstOpportunityId(state)),
  user: state.user
}))(Detail))