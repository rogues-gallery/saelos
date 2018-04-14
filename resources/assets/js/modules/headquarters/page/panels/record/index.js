import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Select from 'react-select'
import { getActivity } from '../../../../activities/store/selectors'
import { getStatuses } from '../../../../statuses/store/selectors'
import { getStages } from '../../../../stages/store/selectors'
import ActionView from '../../../../activities/components/ActionView'
import { Link } from "react-router-dom"
import { Money } from 'react-format'
import * as MDIcons from 'react-icons/lib/md'
import {deleteActivity, fetchActivity, saveActivity} from '../../../../activities/service'
import TagsPartial from '../../../../tags/partials/tags'
import _ from 'lodash'
import { saveContact } from '../../../../contacts/service'
import { saveOpportunity } from '../../../../opportunities/service'
import { fetchStages } from '../../../../stages/service'
import { fetchStatuses } from '../../../../statuses/service'

class Record extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formState: props.activity.originalProps,
      contact: {
        id: props.activity.contact ? props.activity.contact.id : null,
        status_id: props.activity.contact ? props.activity.contact.status.id : null
      },
      opportunity: {
        id: props.activity.opportunity ? props.activity.opportunity.id : null,
        stage_id: props.activity.opportunity ? props.activity.opportunity.stage.id : null
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchStatuses())
    this.props.dispatch(fetchStages())
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      formState: nextProps.activity.originalProps,
      contact: {
        id: nextProps.activity.contact ? nextProps.activity.contact.id : null,
        status_id: nextProps.activity.contact ? nextProps.activity.contact.status.id : null
      },
      opportunity: {
        id: nextProps.activity.opportunity ? nextProps.activity.opportunity.id : null,
        stage_id: nextProps.activity.opportunity ? nextProps.activity.opportunity.stage.id : null
      }
    })
  }

  _handleInputChange = (event) => {
    const { name, value } = event.target
    const state = this.state

    _.set(state, name, value)

    this.setState({
      state
    })
  }

  _complete = () => {
    const { formState } = this.state

    _.set(formState, 'completed', 1)

    this._submit(formState)
  }

  _submit = (state) => {
    const submitData = state.id ? state : this.state.formState

    this.props.dispatch(saveActivity(submitData))
  }

  _submitStatusChange = () => {
    const { dispatch, activity } = this.props

    dispatch(saveContact(this.state.contact))
      .then(() => {
        dispatch(fetchActivity(activity.id))
      })
  }

  _submitStageChange = () => {
    const { dispatch, activity } = this.props

    dispatch(saveOpportunity(this.state.opportunity))
      .then(() => {
        dispatch(fetchActivity(activity.id))
      })
  }

  _delete = () => {
    this.props.dispatch(deleteActivity(this.props.activity.id))
  }

  render() {
    const { activity, statuses, stages } = this.props
    const { formState, contact, opportunity } = this.state
    const actionView = activity.details_type === 'App\\CallActivity' ? 'call' : 'email'

    if (activity.id === null && this.props.match.params.id !== 'new') {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">Select a task <span className="d-none d-lg-inline">on the left</span> to get started.</h2>
        </main>
      )
    }

    return (
      <main className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item" onClick={this._complete}><span className="h5"><MDIcons.MdCheck /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._delete}><span className="h2"><MDIcons.MdDelete /></span></button>

          <div className="float-right text-right pt-2">
            <div className="mini-text text-muted">Assigned To</div>
            <div className="text-dark mini-text"><b>{activity.user.name}</b></div>
          </div>

        </div>
        <h4 className="border-bottom py-3">
          {activity.name}
          <TagsPartial tags={activity.tags} entityId={activity.id} entityType="App\Activity" />
        </h4>

        <div className="h-scroll">
          <div className="card mb-2">
            <div className="card-body border-bottom" dangerouslySetInnerHTML={{__html: activity.description}} />
            <ActionView view={actionView} model={activity.contact} />
          </div>
          <div className="row">

            {activity.contact.id ?
              <div className="col-12">
                <div className="card mb-1">
                  <ul className="list-group list-group-flush">
                    <li key="company" className="list-group-item">
                      <div className="mini-text text-muted">Contact Information</div>
                      <div className="row">
                        <div className="col-8 py-2">
                          <p className="font-weight-bold"><Link className="hidden-link" to={`/contacts/${activity.contact.id}`}>{activity.contact.first_name} {activity.contact.last_name}</Link></p>
                          <p className=""><Link className="hidden-link" to={`/companies/${activity.contact.company.id}`}>{activity.contact.company.name}</Link></p>
                          <p className="text-muted">{activity.contact.address1} {activity.contact.city} {activity.contact.state} {activity.contact.zip}</p>
                        </div>
                        <div className="col-4">
                          <label htmlFor="contact-status">Status</label>
                          <Select
                            value={contact.status_id}
                            options={statuses.map(s => ({value: s.id, label: s.name}))}
                            onChange={selection => {
                              const event = {
                                target: {
                                  name: 'contact.status_id',
                                  value: selection ? selection.value : null
                                }
                              }

                              this._handleInputChange(event)
                              this._submitStatusChange()
                            }}
                            />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              : ''}

            {activity.company.id ?
            <div className="col-12">
              <div className="card mb-1">
                <ul className="list-group list-group-flush">
                  <li key="company" className="list-group-item">
                    <div className="mini-text text-muted">Company Information</div>
                    <div className="py-2">
                      <p className="font-weight-bold"><Link className="hidden-link" to={`/companies/${activity.company.id}`}>{activity.company.name}</Link></p>
                      <p className="text-muted">{activity.company.address1} {activity.company.city} {activity.company.state} {activity.company.zip}</p>
                      <p>{activity.company.phone}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            : '' }

            {activity.opportunity.id ?
            <div className="col-12">
              <div className="card mb-1">
                <ul className="list-group list-group-flush">
                  <li key="company" className="list-group-item">
                    <div className="mini-text text-muted">Opportunity Information</div>
                    <div className="row">
                      <div className="col-8 py-2">
                        <p className="font-weight-bold"><Link className="hidden-link" to={`/opportunities/${activity.opportunity.id}`}>{activity.opportunity.name}</Link></p>
                        <p className=""><Money>{activity.opportunity.amount}</Money></p>
                        <p className="">{activity.opportunity.estimated_close}</p>
                      </div>
                      <div className="col-4">
                        <label htmlFor="opportunity-stage">Stage</label>
                        <Select
                          value={opportunity.stage_id}
                          options={stages.map(s => ({value: s.id, label: s.name}))}
                          onChange={selection => {
                            const event = {
                              target: {
                                name: 'opportunity.stage_id',
                                value: selection ? selection.value : null
                              }
                            }

                            this._handleInputChange(event)
                            this._submitStageChange()
                          }}
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            : '' }

          </div>
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  activity: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  activity: getActivity(state, ownProps.match.params.id || {}),
  statuses: getStatuses(state),
  stages: getStages(state)
}))(Record))
