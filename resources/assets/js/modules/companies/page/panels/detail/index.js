import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'
import moment from 'moment'

import Opportunities from '../../../../opportunities/partials/_opportunities'
import Contacts from '../../../../contacts/partials/_contacts'
import Notes from '../../../../notes/partials/_notes'
import Company from '../../../Company'
import {getCompany, getFirstCompanyId} from '../../../store/selectors'
import { Link } from 'react-router-dom'
import ListActivities from '../../../../activities/partials/_list'
import { Money } from 'react-format'
import { getActiveUser } from '../../../../users/store/selectors'

class Detail extends React.Component {
  constructor(props) {
    super(props)

    this._toggleView = this._toggleView.bind(this)

    this.state = {
      view: "default"
    }
  }

  _toggleView(view) {
    this.setState({view: view})
  }

  render() {
    const {dispatch, company, user, inEdit} = this.props

    if (company.id === null) {
      return ''
    }

    const data = {series: [[5, 4, 7, 3, 9]] }
    const options = {
            low: 0,
            fullWidth: true,
            showArea: true,
            showLabel: false,
            axisX: {
              showGrid: true,
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
        return <Details company={company} dispatch={dispatch} toggle={this._toggleView} user={user} data={data} options={options} inEdit={inEdit} />
      case 'history':
        return <History activities={company.activities} dispatch={dispatch} toggle={this._toggleView} inEdit={inEdit} />
    }
  }
}

const Details = ({company, dispatch, toggle, user, data, options, inEdit}) => (
  <div className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-fixed r-0 mr-2" onClick={() => toggle('history')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
        <div className="pt-1 mt-1 h5 text-center">Company Details</div>
    </div>
    <div className="h-scroll">
      <div className="card ct-container">
        <div className="card-header" id="headingSnapshot">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseSnapshot" aria-expanded="true" aria-controls="collapseSRI">
            <MDIcons.MdKeyboardArrowDown /> Snapshot
          </h6>
        </div>

        <div id="collapseSnapshot" className="collapse show" aria-labelledby="headingSnapshot">
          <div className="card-body border-bottom">
            <div className="h1 text-center"><Money>{_.sum(_.map(company.opportunities, 'amount'))}</Money></div>
            <div className="text-center mini-text text-muted text-uppercase pb-2"><MDIcons.MdAccessTime /> Current <span className="text-dark">Pipeline Value</span></div>
            {/*
            @TODO: Add this back when we figure out what data to display
            <ScoreChart data={data} options={options} type="Line" />
            <div className="mini-text text-muted font-weight-bold text-uppercase mt-2">Active Pipeline</div>
            <p><Link className="hidden-link" to={`/opportunities/?searchString=${company.name}`}><Money>{_.sum(_.map(company.opportunities, 'amount'))}</Money> in open opportunities</Link></p>
            */}
          </div>
        </div>
      </div>
      <ActivityList company={company} dispatch={dispatch} />
      <Contacts contacts={company.contacts} dispatch={dispatch} entityId={company.id} entityType="App\Company" />
      <Opportunities opportunities={company.opportunities} dispatch={dispatch} entityId={company.id} entityType="App\Company" />
      <Notes notes={company.notes} dispatch={dispatch} entityId={company.id} entityType="App\Company" user={user} />
    </div>
  </div>
)

const History = ({activities, dispatch, toggle, inEdit}) => (
  <div className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-fixed ml-2" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
      <div className="pt-1 mt-1 h5 text-center">History</div>
    </div>
    <div className="h-scroll history">
      {activities.map(activity => (
          <div className="list-group-item" key={`activity-history-${activity.id}`}>
            <span className="text-muted float-right mini-text">{moment(activity.created_at).fromNow()}</span>
            <div className="activity"><b>{activity.name}</b></div>
            <div dangerouslySetInnerHTML={{__html: activity.description}} />
          </div>
          ))}
    </div>
  </div>
)

const ScoreChart = ({data, options, type}) => {
  return (
    <ChartistGraph data={data} options={options} type={type} className="sri-chart" />
  )
}

const ActivityList = ({company, dispatch}) => {
  const filtered = _.filter(
    _.filter(company.activities, a => a.details_type !== 'App\\FieldUpdateActivity'),
    fa => fa.completed === 0
  )

  return (
    <div className="card ct-container">
      <div className="card-header" id="taskList">
        <h6 className="mb-0" data-toggle="collapse" data-target="#collapseTasks" aria-expanded="true" aria-controls="collapseTasks">
          <MDIcons.MdKeyboardArrowDown /> Tasks <span className="text-muted font-weight-normal">({filtered.length})</span>
        </h6>
      </div>
      <div id="collapseTasks" className="collapse mh-200" aria-labelledby="taskList">
        <div className="list-group">
          <ListActivities activities={filtered} dispatch={dispatch} view={'headquarters'} />
        </div>
      </div>
    </div>
  )
}

Detail.propTypes = {
  company: PropTypes.instanceOf(Company).isRequired,
  user: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  company: getCompany(state, ownProps.match.params.id || getFirstCompanyId(state)),
  user: getActiveUser(state)
}))(Detail))
