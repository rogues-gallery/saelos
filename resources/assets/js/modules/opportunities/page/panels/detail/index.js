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
import ListActivities from '../../../../activities/partials/_list'
import { getFirstOpportunityId, getOpportunity } from '../../../store/selectors'
import { isInEdit } from '../../../../contacts/store/selectors'
import { getActiveUser } from '../../../../users/store/selectors'
import { getStages } from '../../../../stages/store/selectors'
import { openTaskContainer } from '../../../../activities/store/actions'

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
    const { opportunity, dispatch, user, inEdit, stages } = this.props
    const ordered = _.orderBy(stages, 'probability')
    const currentIndex = _.findIndex(ordered, s => s.id === opportunity.stage.id)
    const nextStage = currentIndex + 1 >= ordered.length ? 'In final stage' : ordered[currentIndex + 1].name

    const data = {
      series: [
        ordered.map(s => parseInt(s.probability) >= parseInt(opportunity.stage.probability) ? 1 : null),
        ordered.map(s => parseInt(s.probability) > parseInt(opportunity.stage.probability) ? null : 1)
      ]
    }
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

    if (opportunity.id === null) {
      return ''
    }


    switch(this.state.view) {
      case 'default':
        return <Details opportunity={opportunity} dispatch={dispatch} toggle={this._toggleView} user={user} data={data} options={options} inEdit={inEdit} nextStage={nextStage} />
      case 'history':
        return <History activities={opportunity.activities} dispatch={dispatch} toggle={this._toggleView} inEdit={inEdit} />
    }
  }
}

const Details = ({opportunity, dispatch, toggle, user, data, options, inEdit, nextStage}) => (
  <div className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-absolute r-0 mr-2" onClick={() => toggle('history')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
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
            <p>{nextStage}</p>
          </div>
        </div>
      </div>
      <ActivityList opportunity={opportunity} dispatch={dispatch} />
      <Contacts contacts={opportunity.contacts} dispatch={dispatch} entityType='App\Opportunity' entityId={opportunity.id} />
      <Companies companies={opportunity.companies} dispatch={dispatch} entityType='App\Opportunity' entityId={opportunity.id} />
      <Notes model={opportunity} dispatch={dispatch} user={user} />
    </div>
  </div>
)

const History = ({activities, dispatch, toggle, inEdit}) => (
  <div className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-absolute ml-2" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
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

const OpportunityTimeline = ({data, options, type}) => {
  return (
    <ChartistGraph data={data} options={options} type={type} className="opportunity-timeline" />
  )
}

const ActivityList = ({opportunity, dispatch}) => {
  const _toggleAdd = () => {
    dispatch(openTaskContainer(
      opportunity,
      'task'
    ))
  }

  const filtered = _.filter(opportunity.activities, a => a.details_type !== 'App\\FieldUpdateActivity')

  return (
    <div className="card ct-container">
      <div className="card-header" id="taskList">
        <a href="javascript:void(0);" className="float-right" onClick={_toggleAdd}>
          <strong>+ Add</strong>
        </a>
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
  opportunity: PropTypes.instanceOf(Opportunity).isRequired,
  user: PropTypes.object.isRequired,
  stages: PropTypes.array.isRequired,
}

export default withRouter(connect((state, ownProps) => ({
  opportunity: getOpportunity(state, ownProps.match.params.id || getFirstOpportunityId(state)),
  user: getActiveUser(state),
  inEdit: isInEdit(state),
  stages: getStages(state)
}))(Detail))
