import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import ChartistGraph from 'react-chartist'
import { NavLink } from 'react-router-dom'

import Opportunities from '../../../../opportunities/partials/_opportunities'
import Companies from '../../../../companies/partials/_companies'
import Contact from '../../../Contact'
import Notes from '../../../../notes/partials/_notes'
import { saveContact } from '../../../service'
import { getContact, getFirstContactId, isStateDirty } from '../../../store/selectors'
import { isInEdit } from '../../../../contacts/store/selectors'
import ListActivities from '../../../../activities/partials/_list'
import { getStatuses } from '../../../../statuses/store/selectors'
import { getActiveUser } from '../../../../users/store/selectors'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formState: props.contact.originalProps,
      view: "default"
    }

    this._toggleView = this._toggleView.bind(this)
    this._statusChange = this._statusChange.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._submit = this._submit.bind(this)
  }

  _submit() {
    this.props.dispatch(saveContact(this.state.formState))
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({formState: nextProps.contact.originalProps})
  }
  
  _toggleView(view) {
    this.setState({view})
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let contactState = this.state.formState;

    _.set(contactState, name, value);

    this.setState({
      formState: contactState
    });

    // Set the value on the contact prop as well
    _.set(this.props.contact, name, value)
  }


  _statusChange(id) {
    const event = {
      target: {
        type: 'text',
        name: 'status_id',
        value: id
      }
    }

    this._handleInputChange(event)
    this._submit()
  }

  render() {
    const { contact, dispatch, user, inEdit, statuses } = this.props

    if (contact.id === null) {
      return ''
    }

    switch(this.state.view) {
      case 'default':
        return <Details contact={contact} dispatch={dispatch} toggle={this._toggleView} user={user} inEdit={inEdit} statuses={statuses} statusChange={this._statusChange} />
      case 'history':
        return <History activities={contact.activities} dispatch={dispatch} toggle={this._toggleView} inEdit={inEdit} />
    }
  }
}

const Details = ({contact, dispatch, toggle, user, inEdit, statuses, statusChange}) => (
  <div className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom  py-2 heading">
      <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-absolute r-0 mr-2" onClick={() => toggle('history')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
      <div className="pt-1 mt-1 h5 text-center">
        Contact Details
      </div>
    </div>
    <div className="h-scroll">
      <StatusTimeline contact={contact} statuses={statuses} statusChange={statusChange} />
      <ActivityList contact={contact} dispatch={dispatch} />
      <Opportunities opportunities={contact.opportunities} dispatch={dispatch} entityType="App\Contact" entityId={contact.id} />
      <Companies companies={contact.companies} dispatch={dispatch} entityType="App\Contact" entityId={contact.id} />
      <Notes notes={contact.notes} dispatch={dispatch} entityType="App\Contact" entityId={contact.id} user={user} />
    </div>
  </div>
)

const History = ({activities, dispatch, toggle, inEdit}) => (
  <div className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="btn btn-xs btn-outline-secondary position-fixed ml-2 mt-1" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
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

const StatusTimeline = ({contact, statuses, statusChange}) => {
  const ordered = _.orderBy(statuses, 'ordering')

  const data = {
    series: [
      ordered.map(s => parseInt(s.ordering) >= parseInt(contact.status.ordering) ? 1 : null),
      ordered.map(s => parseInt(s.ordering) > parseInt(contact.status.ordering) ? null : 1)
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

  const firstNotCompleted = _.find(contact.activities, a => !a.completed)
  const link = firstNotCompleted
    ? <NavLink to={`/headquarters/${firstNotCompleted.id}`}>{firstNotCompleted.name}</NavLink>
    : 'All caught up!'
  const recentlyCompleted = _.find(_.orderBy(_.find(contact.activities, 'completed'), 'created_at'), a => a.details_type !== 'App\\FieldUpdateActivity')
  const lastTouch  = recentlyCompleted ? recentlyCompleted.created_at : contact.updated_at

  return (
    <div className="card ct-container-inverse">
      <div className="card-header" id="statusTimeline">
        <h6 className="mb-0" data-toggle="collapse" data-target="#collapseTimeline" aria-expanded="true" aria-controls="collapseTimeline">
          <MDIcons.MdKeyboardArrowDown /> Status Snapshot
        </h6>
      </div>
      <div id="collapseTimeline" className="collapse show" aria-labelledby="statusTimeline">
        <div className="card-body border-bottom">

          <div className="dropdown show">
            <div id="statusDropdown" data-toggle="dropdown" className="h1 text-center cursor-pointer dropdown">{contact.status.name}</div>
            <div className="dropdown-menu absolute-centered" aria-labelledby="statusDropdown">
              {statuses.map(status => (
                <a key={`contact-${contact.id}-status-${status.id}`} className="dropdown-item" href="javascript:void(0)" onClick={() => statusChange(status.id)}>{status.name}</a>
              ))}
            </div>
          </div>

          <div className="text-center mini-text text-muted text-uppercase pb-2">
            <MDIcons.MdAccessTime /> Last touched <span className="text-dark">{moment(lastTouch).fromNow()}</span>
          </div>
          <ChartistGraph data={data} options={options} type="Line" className="status-timeline" />
          <div className="mini-text text-muted font-weight-bold text-uppercase mt-2">Next Task</div>
          <p>{link}</p>
        </div>
      </div>
    </div>
  )
}

const ActivityList = ({contact, dispatch}) => {
  const filtered = _.filter(
    _.filter(contact.activities, a => a.details_type !== 'App\\FieldUpdateActivity'),
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
  contact: PropTypes.instanceOf(Contact).isRequired,
  user: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id || getFirstContactId(state)),
  user: getActiveUser(state),
  isFetching: isStateDirty(state),
  inEdit: isInEdit(state),
  statuses: getStatuses(state)
}))(Detail))
