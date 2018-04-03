import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as MDIcons from 'react-icons/lib/md'
import ChartistGraph from 'react-chartist'

import Volume from '../partials/_volume'
import Email from '../partials/_email'
import Calls from '../partials/_calls'
import Team from '../partials/_team'
import Opportunities from '../partials/_opportunities'
import Responses from '../partials/_responses'
import {getStatuses} from "../../../../statuses/store/selectors"
import {fetchStatuses} from "../../../../statuses/service"
import {fetchContacts} from "../../../../contacts/service"

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "default"
    }

    this._toggleView = this._toggleView.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchStatuses())
  }

  _toggleView(view) {
    this.setState({view})
  }

  render() {
    const contacts = {}

    switch(this.state.view) {
      case 'default':
        return <Pipeline contacts={contacts} dispatch={this.props.dispatch}  toggle={this._toggleView} user={this.props.user} router={this.context.router} statuses={this.props.statuses} />
      case 'vector':
        return <Vector dispatch={this.props.dispatch} toggle={this._toggleView} user={this.props.user} />
    }
  }
}

const Vector = ({dispatch, toggle, user}) => {
  const data = {labels: ['V', 'E', 'C', 'T', 'O', 'R'], series: [[4, 5, 6, 7, 5, 8], [10,10,10,10,10,10]] }
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

        <Volume />
        <Email />
        <Calls />
        <Team />
        <Opportunities />
        <Responses />
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

const Pipeline = ({contacts, dispatch, toggle, user, statuses, router}) => {

  const data = {series: [{name: 'stage', data: [10, 8, 4, 3, 1, 5] }]}
  const options = {
    low: 0,
    fullWidth: true,
    showArea: true,
    showLabel: false,
    axisX: {
      showGrid: false,
      showLabel: false,
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
              <div className="h1 text-center">283</div>
              <div className="text-center mini-text text-muted text-uppercase pb-2"><span className="text-danger h5"><MDIcons.MdArrowDropDown /></span><span className="text-dark">3% decrease</span> since last week</div>
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
            {statuses.map(s => (
              <div key={`user-${user.id}-status-${s.id}`} className="list-group">
                <div className="list-group-item list-group-item-action align-items-start">
                  <p onClick={() => openContactSearch(`assignee:${user.id} status:"${s.name}"`)}><strong>{s.name}</strong></p>
                </div>
              </div>
            ))}
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
  user: state.user,
  statuses: getStatuses(state)
}))(Detail))
