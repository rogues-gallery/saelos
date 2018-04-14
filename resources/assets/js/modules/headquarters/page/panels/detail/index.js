import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as MDIcons from 'react-icons/lib/md'
import ChartistGraph from 'react-chartist'
import _ from 'lodash'

import Volume from '../partials/_volume'
import Email from '../partials/_email'
import Calls from '../partials/_calls'
import Team from '../partials/_team'
import Opportunities from '../partials/_opportunities'
import Responses from '../partials/_responses'
import { getStatuses } from '../../../../statuses/store/selectors'
import { getActiveUser } from '../../../../users/store/selectors'

import { fetchStatuses } from '../../../../statuses/service'
import { fetchContacts } from '../../../../contacts/service'
import { fetchContactCount } from '../../../../contacts/service'
import { fetchQuotaCount } from '../../../../users/service'
import { getCustomFieldValue } from '../../../../../utils/helpers'
import { fetchUser } from '../../../../auth/service'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "default",
      contactCount: [],
      quotaCount: [],
    }

    this._toggleView = this._toggleView.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchUser())
    this.props.dispatch(fetchStatuses())
  }

  componentDidMount() {
    const { dispatch, user } = this.props

    dispatch(fetchContactCount(user.id))
      .then(res => {
        this.setState({
          contactCount: res.data
        })
      })

    dispatch(fetchQuotaCount(user.id))
      .then(res => {
        this.setState({
          quotaCount: res.data
        })
      })
  }

  _toggleView(view) {
    this.setState({view})
  }

  render() {
    const { dispatch, statuses, user } = this.props
    const { contactCount, quotaCount } = this.state
    const contacts = {}

    switch(this.state.view) {
      case 'default':
        return <Pipeline contacts={contacts} dispatch={dispatch}  toggle={this._toggleView} user={user} router={this.context.router} statuses={statuses} count={contactCount} />
      case 'vector':
        return <Vector dispatch={dispatch} toggle={this._toggleView} user={user} count={quotaCount} />
    }
  }
}

const Vector = ({dispatch, toggle, user, count}) => {

  const data = {
    labels: ['V', 'E', 'C', 'T', 'O', 'R'],
    series: [
      ['volume', 'email', 'calls', 'team', 'opportunities', 'responses'].map(k => count[k])
    ]
  }

  const options = {
    high: 10,
    low: 0,
    stackBars: true,
    fullWidth: true,
    showArea: true,
    // showLabel: true,
    axisX: {
      showGrid: false,
      showLabel: true,
      // offset: 0
    },
    axisY: {
      showGrid: true,
      showLabel: false,
      offset: 0
    }
  }

  const emailQuota = parseInt(getCustomFieldValue('number_of_emails', user.custom_fields, 15))
  const callQuota = parseInt(getCustomFieldValue('number_of_calls', user.custom_fields, 15))
  const teamQuota = parseInt(getCustomFieldValue('number_of_sms', user.custom_fields, 15))
  const oppQuota = parseInt(getCustomFieldValue('number_of_opportunities', user.custom_fields, 15))
  const responseQuota = parseInt(getCustomFieldValue('number_of_responses', user.custom_fields, 15))
  const volumeQuota = _.sum([emailQuota, callQuota, teamQuota, oppQuota, responseQuota])

  return (
    <div className="col detail-panel border-left">
      <div className="border-bottom py-2 heading">
        <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-absolute r-0 mr-2" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
        <div className="pt-1 mt-1 h5 text-center">VECTOR</div>
      </div>
      <div className="h-scroll">
        <div className="card ct-container">
          <div className="card-header" id="headingVector">
            <h6 className="mb-0" data-toggle="collapse" data-target="#headingVector" aria-expanded="true" aria-controls="collapseVector">
              <MDIcons.MdKeyboardArrowDown /> Summary
            </h6>
          </div>

          <div id="collapseVector" className="collapse show" aria-labelledby="headingVector">
            <div className="card-body border-bottom">
              <VectorChart data={data} options={options} type="Bar" />
            </div>
          </div>
        </div>

        <Volume quota={volumeQuota} total={count.volume} />
        <Email quota={emailQuota} total={count.email} />
        <Calls quota={callQuota} total={count.calls} />
        <Team quota={teamQuota} total={count.team} />
        <Opportunities quota={oppQuota} total={count.opportunities} />
        <Responses quota={responseQuota} total={count.responses} />
      </div>
    </div>
  )
}

const VectorChart = ({data, options, type}) => {
  return (
    <div className="vectorGraph">
      <div className="h1 text-center">74%</div>
      <div className="text-center mini-text text-muted text-uppercase pb-2"><span className="text-success h5"><MDIcons.MdArrowDropUp /></span><span className="text-dark">23% improvement</span> since last week</div>
      <ChartistGraph data={data} options={options} type={type} className="vector-graph" />
    </div>
  )
}

const Pipeline = ({contacts, dispatch, toggle, user, statuses, router, count }) => {
  const contact_percent_difference = ((user.total_contacts - user.total_contacts_last_week)/user.total_contacts_last_week) * 100
  const percent = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2 }).format(contact_percent_difference)

  const data = {
    labels: Object.keys(count).map(k => _.find(statuses, s => s.id === parseInt(k)).name),
    series: [
      Object.keys(count).map(k => count[k])
    ]
  }

  const options = {
    low: 0,
    fullWidth: true,
    showArea: true,
    axisX: {
      showGrid: false,
      showLabel: true,
      offset: 0
    },
    axisY: {
      showGrid: true,
      showLabel: false,
      offset: 0
    }
  }

  const openContactSearch = (string) => {
    dispatch(fetchContacts({page: 1, searchString: string}))
    router.history.push('/contacts');
  }

  return (
    <div className="col detail-panel border-left">
      <div className="border-bottom py-2 heading">
        <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-absolute ml-2" onClick={() => toggle('vector')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
        <div className="pt-1 mt-1 h5 text-center">Pipeline</div>
      </div>
      <div className="h-scroll ct-container">
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">
              <MDIcons.MdKeyboardArrowDown /> My Contacts
            </h6>
          </div>

          <div className="card-body border-bottom">
            <div className="pipelineGraph">
              <div className="h1 text-center">{user.total_contacts}</div>
              <div className="text-center mini-text text-muted text-uppercase pb-2">
                {user.total_contacts > user.total_contacts_last_week
                  ? <span className="text-success h5"><MDIcons.MdArrowDropUp /></span>
                  : <span className="text-danger h5"><MDIcons.MdArrowDropDown /></span>
                }

                <span className="text-dark">{percent}% change</span> since last week
              </div>
              <ChartistGraph data={data} options={options} type="Bar" className="graph" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingStatus">
            <h6 className="mb-0" data-toggle="collapse" data-target="#collapseStatus" aria-expanded="false" aria-controls="collapseStatus">
              <MDIcons.MdKeyboardArrowDown /> Current Status
            </h6>
          </div>

          <div id="collapseStatus" className="show collapse mh-200" aria-labelledby="headingStatus">
            {statuses.map(s => {
              const thisCount = _.get(count, s.id, null)

              return (
                <div key={`user-${user.id}-status-${s.id}`} className="list-group">
                  <div className="list-group-item list-group-item-action align-items-start">
                    <p onClick={() => openContactSearch(`assignee:${user.id} status:"${s.name}"`)}><strong>{s.name} {thisCount ? <span className="text-muted">({thisCount})</span> : ''}</strong></p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

Detail.propTypes = {
  user: PropTypes.object.isRequired,
  statuses: PropTypes.array.isRequired
}

Detail.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  user: getActiveUser(state),
  statuses: getStatuses(state)
}))(Detail))
