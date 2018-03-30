import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { convertHex } from '../../../utils/helpers/graphics'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import {getTags} from "../store/selectors"
import {fetchContact, fetchContacts} from "../../contacts/service"
import {fetchOpportunities, fetchOpportunity} from "../../opportunities/service"
import {fetchCompanies, fetchCompany} from "../../companies/service"
import {saveTag} from "../service"
import { CirclePicker } from 'react-color'

class TagsPartial extends React.Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._submit = this._submit.bind(this)
    this._navToSearch = this._navToSearch.bind(this)
    this._tagEntity = this._tagEntity.bind(this)
    this._openAddTag = this._openAddTag.bind(this)

    this.state = {
      formState: {

      },
      addTagOpen: false
    }
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
        }
      })

    this.setState({
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
    }
  }

  _tagEntity(id) {
    let name

    switch(this.props.entityType) {
      case 'App\\Contact':
        name = 'contact_id'
        break;
      case 'App\\Company':
        name = 'company_id'
        break;
      case 'App\\Opportunity':
        name = 'opportunity_id'
        break;
    }

    const event = {
      target: {
        name: name,
        value: this.props.entityId
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
    }

    this._submit(tag)
  }

  _openAddTag() {
    this.setState({
      addTagOpen: true
    })
  }

  render() {
    const { allTags, tags, entityId } = this.props
    const { formState, addTagOpen } = this.state

    const filtered = _.filter(allTags, at => _.findIndex(tags, t => t.id === at.id) < 0)
    const myTags = _.filter(allTags, at => _.findIndex(tags, t => t.id === at.id) >= 0)

    return (
      <React.Fragment>
        <small className="ml-3">
          {myTags.map(t =>
            <div className="btn-group mr-2">
              <button
                onClick={() => this._navToSearch(`tag:"${t.name}"`)}
                key={`entity-${entityId}-tag-${t.id}-${t.color}`}
                style={{backgroundColor: convertHex(t.color, 10), borderColor: t.color, color: t.color}}
                className="btn btn-outline-secondary btn-sm">
                {t.name}
              </button>
              <button
                onClick={() => this._removeTag(t.originalProps)}
                key={`entity-${entityId}-tag-${t.id}-${t.color}-remove`}
                style={{backgroundColor: convertHex(t.color, 10), borderColor: t.color, color: t.color}}
                className="btn btn-outline-secondary btn-sm">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <button
            onClick={this._openAddTag}
            className="btn btn-outline-secondary btn-sm">
            + ADD TAG
          </button>
          {addTagOpen ?
            <div className="add-tag-container">
              <div className="add-tag-menu dropdown-menu show mt-1 pt-1">
                {filtered.map(t => (
                  <span
                    key={`entity-${entityId}-tag-${t.id}-${t.color}`}
                    className="dropdown-item px-2" onClick={() => this._tagEntity(t.id)}>
                      <span className="dot mr-2" style={{backgroundColor: t.color}} />
                      {t.name}
                    </span>
                ))}
                <div className="dropdown-divider" />
                <div className="px-2 py-2">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
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
                  <button type="submit" className="btn btn-primary btn-sm" onClick={this._tagEntity}>Create</button>
                </div>
              </div>
            </div>
            : ''}
        </small>
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