import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import Select from 'react-select'
import { connect } from 'react-redux'
import _ from 'lodash'
import { saveContact } from "../../contacts/service"
import { saveCompany } from "../../companies/service"
import { searchOpportunities } from "../service"

class Opportunities extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._toggleAdd = this._toggleAdd.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._searchOpportunities = this._searchOpportunities.bind(this)

    this.state = {
      formState: {
        id: props.entityId,
        opportunity: {
          id: null,
          name: null
        }
      },
      adding: false
    }
  }

  _toggleAdd(e) {
    e.stopPropagation()

    this.setState({adding: !this.state.adding})
  }

  _searchOpportunities(input) {
    let search = '';

    if (input && input.length > 0) {
      search = {
        searchString: input
      }
    }

    return searchOpportunities(search)
      .then(opportunities => {
        let options = opportunities.map(c => ({
            id: c.id,
            name: c.name
          })
        )

        return {options}
      })
  }

  _handleInputChange(e) {
    const { target } = e
    const { name } = target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { formState } = this.state

    _.set(formState, name, value)

    this.setState({
      formState
    })
  }

  _submit(e) {
    const { dispatch } = this.props
    const opportunities = this.props.opportunities.map(c => c.originalProps)

    opportunities.push(this.state.formState.opportunity)

    const submitProps = {
      id: this.state.formState.id,
      opportunities: opportunities
    }

    switch (this.props.entityType) {
      case 'App\\Contact':
        dispatch(saveContact(submitProps))
        break
      case 'App\\Company':
        dispatch(saveCompany(submitProps))
        break
    }

    this._toggleAdd(e)
  }

  _getSecondaryDetail(type) {
    switch (type) {
      case 'App\\Contact':
        return 'pivot.position'
      default:
        return 'company.name'
    }
  }

  render() {
    const { opportunities, dispatch, entityType, entityId } = this.props
    const secondaryDetail = this._getSecondaryDetail(entityType)

    return (
      <div className="card">
        <div className="card-header" id="headingOpportunities">
          <span className="float-right" onClick={this._toggleAdd}>
            <strong>+ Add</strong>
          </span>
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseOpportunities" aria-expanded="true" aria-controls="collapseOpportunities">
            <MDIcons.MdKeyboardArrowDown /> Opportunities <span className="text-muted font-weight-normal">({opportunities.length})</span>
          </h6>
        </div>

        {this.state.adding ?
          <div id="addCompany" className="py-2 px-3 border-bottom">
            <Select.Async
              value={this.state.formState.opportunity && this.state.formState.opportunity.id ? this.state.formState.opportunity : null}
              multi={false}
              loadOptions={this._searchOpportunities}
              labelKey='name'
              valueKey='id'
              onChange={(value) => {
                const event = {
                  target: {
                    type: 'select',
                    name: 'opportunity',
                    value: value
                  }
                }

                this._handleInputChange(event);
              }}
            />
            {this.props.entityType === 'App\\Contact' ?
              <input type="text" id="position" className="form-control" name="opportunity.pivot.position" placeholder="Role" onChange={this._handleInputChange} />
              : ''}
            <button className="btn btn-primary" onClick={this._submit}>Add</button>
          </div>
          : ''}

        <div id="collapseOpportunities" className="collapse show mh-200" aria-labelledby="headingOpportunities">
          <div className="list-group border-bottom">
            {opportunities.map(opportunity => (
              <div key={`opportunity-${opportunity.id}-${entityId}`} onClick={() => this.context.router.history.push(`/opportunities/${opportunity.id}`)} className="list-group-item list-group-item-action align-items-start">
                <p className="mini-text text-muted float-right">{opportunity.status}</p>
                <p><strong>{opportunity.name}</strong>
                  <br />{_.get(opportunity, secondaryDetail)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

Opportunities.propTypes = {
  dispatch: PropTypes.func.isRequired,
  opportunities: PropTypes.array.isRequired,
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.number
}

Opportunities.contextTypes = {
  router: PropTypes.object
}

export default connect()(Opportunities)