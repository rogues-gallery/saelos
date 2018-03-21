import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'
import { Money } from 'react-format'
import moment from 'moment'

import Contacts from '../../../../contacts/partials/_contacts'
import Companies from '../../../../companies/partials/_companies'
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
    const {opportunity, dispatch, user, inEdit} = this.props

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
        return <Details opportunity={opportunity} dispatch={dispatch} toggle={this._toggleView} user={user} data={data} options={options} inEdit={inEdit} />
      case 'history':
        return <History activities={opportunity.activities} dispatch={dispatch} toggle={this._toggleView} inEdit={inEdit} />
    }
  }
}

const Details = ({opportunity, dispatch, toggle, user, data, options, inEdit}) => (
  <div key={1} className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-fixed r-0 mr-2" onClick={() => toggle('history')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
        <div className="pt-1 mt-1 h5 text-center">Opportunity Details</div>
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
            <div className="h1 text-center"><Money>{opportunity.amount}</Money></div>
            <div className="text-center mini-text text-muted text-uppercase pb-2"><MDIcons.MdAccessTime /> EST <span className="text-dark">7 days</span> to close</div>
            <OpportunityTimeline data={data} options={options} type="Line" />
            <div className="mini-text text-muted font-weight-bold text-uppercase mt-2">Next Stage</div>
            <p>Closed Won: 100%</p>
          </div>
        </div>
      </div>
      <Contacts contacts={opportunity.contacts} dispatch={dispatch} entityType='App\Opportunity' entityId={opportunity.id} />
      <Companies companies={opportunity.companies} dispatch={dispatch} entityType='App\Opportunity' entityId={opportunity.id} />
      <Notes notes={opportunity.notes} dispatch={dispatch} entityType="App\Opportunity" entityId={opportunity.id} user={user} />
    </div>
  </div>
)

const History = ({activities, dispatch, toggle, inEdit}) => (
  <div key={1} className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-fixed ml-2" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
        <div className="pt-1 mt-1 h5 text-center">History</div>
    </div>
    <div className="h-scroll history">
      {activities.map(activity => (
          <div className="list-group-item" key={`activity-history-${activity.id}`}>
            <span className="text-muted float-right mini-text">{moment(activity.created_at).fromNow()}</span>
            <div className="activity"><b>{activity.title}</b></div>
            <div dangerouslySetInnerHTML={{__html: activity.description}} />
          </div>
          ))}
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
  user: PropTypes.object.isRequired,
  inEdit: PropTypes.bool.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  opportunity: getOpportunity(state, ownProps.match.params.id || getFirstOpportunityId(state)),
  user: state.user
}))(Detail))