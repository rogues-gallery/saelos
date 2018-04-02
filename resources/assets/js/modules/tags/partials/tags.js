import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { convertHex } from '../../../utils/helpers/graphics'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import {getTags} from '../store/selectors'
import {fetchContact, fetchContacts} from '../../contacts/service'
import {fetchOpportunities, fetchOpportunity} from '../../opportunities/service'
import {fetchCompanies, fetchCompany} from '../../companies/service'
import {fetchActivities, fetchActivity} from '../../activities/service'
import {fetchTags, saveTag} from '../service'
import { CirclePicker } from 'react-color'

class TagsPartial extends React.Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._submit = this._submit.bind(this)
    this._navToSearch = this._navToSearch.bind(this)
    this._tagEntity = this._tagEntity.bind(this)
    this._toggleAddTag = this._toggleAddTag.bind(this)

    this.state = {
      formState: {

      },
      addTagOpen: false
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchTags())
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value
    let name = target.name;
    let tagState = this.state.formState;

    // Set the value on the contact prop as well
    _.set(tagState, name, value)

    this.setState({
      formState: tagState
    })
  }

  _submit(tag) {
    const { entityId, dispatch } = this.props
    const submitData = typeof tag !== 'undefined' ? tag : this.state.formState
    dispatch(saveTag(submitData))
      .then(() => {
        switch(this.props.entityType) {
          case 'App\\Contact':
            dispatch(fetchContact(entityId))
            break;
          case 'App\\Company':
            dispatch(fetchCompany(entityId))
            break;
          case 'App\\Opportunity':
            dispatch(fetchOpportunity(entityId))
            break;
          case 'App\\Activity':
            dispatch(fetchActivity(entityId))
            break;
        }
      })

    this.setState({
      formState: {},
      addTagOpen: false
    })
  }

  _navToSearch(searchString) {
    const { dispatch, entityType } = this.props
    const { router } = this.context

    switch(entityType) {
      case 'App\\Contact':
        dispatch(fetchContacts({page: 1, searchString}))
        router.history.push(`/contacts`)
        break;
      case 'App\\Company':
        dispatch(fetchCompanies({page: 1, searchString}))
        router.history.push(`/companies`)
        break;
      case 'App\\Opportunity':
        dispatch(fetchOpportunities({page: 1, searchString}))
        router.history.push(`/opportunities`)
        break;
      case 'App\\Activity':
        dispatch(fetchActivities({page:1, searchString}))
        router.history.push(`/headquarters`)
        break;
    }
  }

  _tagEntity(id) {
    const {entityType, entityId} = this.props
    let name

    switch(entityType) {
      case 'App\\Contact':
        name = 'contact_id'
        break;
      case 'App\\Company':
        name = 'company_id'
        break;
      case 'App\\Opportunity':
        name = 'opportunity_id'
        break;
      case 'App\\Activity':
        name = 'activity_id'
        break;
    }

    const event = {
      target: {
        name: name,
        value: entityId
      }
    }

    this._handleInputChange(event)

    if (id) {
      const idEvent = {
        target: {
          name: 'id',
          value: id
        }
      }

      this._handleInputChange(idEvent)
    }

    this._submit()
  }

  _removeTag(tag) {

    const {entityType, entityId} = this.props

    switch(entityType) {
      case 'App\\Contact':
        tag.contacts = _.filter(tag.contacts, c => c.id !== parseInt(entityId))
        break;
      case 'App\\Company':
        tag.companies = _.filter(tag.companies, c => c.id !== parseInt(entityId))
        break;
      case 'App\\Opportunity':
        tag.opportunities = _.filter(tag.opportunities, o => o.id !== parseInt(entityId))
        break;
      case 'App\\Activity':
        tag.activities = _.filter(tag.activities, a => a.id !== parseInt(entityId))
        break;
    }

    this._submit(tag)
  }

  _toggleAddTag() {
    this.setState({
      addTagOpen: !this.state.addTagOpen
    })
  }

  render() {
    const { allTags, tags, entityId } = this.props
    const { formState, addTagOpen } = this.state

    // @TODO Make myTags and filtered tags part of state instead of filtering here.
    const filtered = _.filter(allTags, at => _.findIndex(tags, t => t.id === at.id) < 0)
    const myTags = _.filter(allTags, at => _.findIndex(tags, t => t.id === at.id) >= 0)

    return (
      <React.Fragment>
        <small className="ml-3">
          {myTags.map(t =>
            {
              let tagStyle = t.color !== 'null' ? 
                {backgroundColor: convertHex(t.color, 10), borderColor: t.color, color: t.color}
                : {}

              return (
                <div key={`entity-${entityId}-tag-${t.id}-${t.color}`} className="btn-group mr-2">
                  <button
                    onClick={() => this._navToSearch(`tag:"${t.name}"`)}
                    style={{backgroundColor: convertHex(t.color, 10), borderColor: t.color, color: t.color}}
                    className="btn btn-outline-secondary btn-sm">
                    {t.name}
                  </button>
                  <button
                    onClick={() => this._removeTag(t.originalProps)}
                    style={tagStyle}
                    className="btn btn-outline-secondary btn-sm">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )
            }
          )}
          <button
            onClick={this._toggleAddTag}
            className="btn btn-outline-secondary btn-sm">
            + ADD TAG
          </button>
        </small>
        {addTagOpen ?
            <div className="add-tag-container">
              <div className="add-tag-menu dropdown-menu show mt-1 pt-2">
                {filtered.map(t => (
                  <span
                    key={`entity-${entityId}-tag-${t.id}-${t.color}`}
                    className="dropdown-item px-2 py-2 cursor-pointer" onClick={() => this._tagEntity(t.id)}>
                      <span className="dot mr-2" style={{backgroundColor: t.color}} />
                      {t.name}
                    </span>
                ))}
                <div className="dropdown-divider" />
                <div className="px-2 py-2">
                  <div className="form-group">
                    <label htmlFor="name">Create New Tag</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="name"
                      name="name"
                      placeholder="Tag Name"
                      value={formState.name}
                      onChange={this._handleInputChange} />
                  </div>
                  <div className="form-group">
                    <CirclePicker
                      color={formState.color}
                      name="tagColor"
                      circleSize={20}
                      circleSpacing={10}
                      onChangeComplete={(color) => {
                        const event = {
                          target: {
                            name: 'color',
                            value: color.hex
                          }
                        }

                        this._handleInputChange(event)
                      }}
                      placeholder={formState.color} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm" onClick={() => this._tagEntity()}>Create</button>
                </div>
              </div>
            </div>
            : ''}
      </React.Fragment>
    )
  }
}

TagsPartial.propTypes = {
  tags: PropTypes.array.isRequired,
  allTags: PropTypes.array.isRequired,
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.number.isRequired
}

TagsPartial.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect(state => ({
  allTags: getTags(state)
}))(TagsPartial))
