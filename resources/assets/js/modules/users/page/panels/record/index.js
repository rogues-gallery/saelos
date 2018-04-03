import React from 'react'
import PropTypes from 'prop-types'
import {getFieldsForUsers, getUser} from '../../../store/selectors'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {deleteUser, saveUser} from '../../../service'
import {getTeams} from '../../../../teams/store/selectors'
import { getRoles } from '../../../../roles/store/selectors'
import Select from 'react-select'
import {renderGroupedFields} from '../../../../../utils/helpers/fields'
import _ from 'lodash'

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      formState: props.user.originalProps
    }
  }

  _submit() {
    this.props.dispatch(saveUser(this.state.formState))
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    let name = target.name
    const { formState } = this.state
    const customFieldIndex = _.findIndex(this.props.fields, f => f.alias === name)

    // Special handling for custom field state
    if (formState.hasOwnProperty(name) === false && customFieldIndex >= 0) {
      let customField = this.props.fields[customFieldIndex];
      let userCustomFieldIndex = _.findIndex(formState.custom_fields, f => f.custom_field_id === customField.id);

      if (userCustomFieldIndex >= 0) {
        formState.custom_fields[userCustomFieldIndex].value = value;
      } else {
        formState.custom_fields.push({
          custom_field_id: customField.id,
          value: value
        });
      }
    } else {
      _.set(formState, name, value);
    }

    this.setState({
      formState
    })
  }

  _delete () {
    const { dispatch, user} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteUser(user.id))
    }
  }

	render() {
    const { user, teams, roles, fields } = this.props
    const { formState } = this.state
    const groups = _.groupBy(fields, 'group')

    if (user.id === null) {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">Select a user <span className="d-none d-lg-inline">on the left </span>to edit.</h2>
        </main>
        )
    }

    const teamOptions = teams.map(t => ({value: t.id, label: t.name}))
    const roleOptions = roles.map(r => ({value: r.id, label: r.name}))
    const customFields = renderGroupedFields(
      true,
      ['core'],
      groups,
      user,
      this._handleInputChange,
      true
    )

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
          <button className="float-right btn btn-primary list-inline-item" onClick={this._submit}>Save</button>
          Edit User: {user.name}
        </h4>

        <div className="h-scroll single-height">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className={`form-group mb-2`}>
		              <label htmlFor="name" className="">Name</label>
		              <div className="">
		                <input type="text" id="name" name="name" onChange={this._handleInputChange} className="form-control" value={formState.name} />
		              </div>
	            	</div>
								<div className={`form-group mb-2`}>
	              	<label htmlFor="username" className="">Username</label>
		              <div className="">
		                <input type="text" id="username" name="username" onChange={this._handleInputChange} className="form-control" value={formState.username}  />
		              </div>
	            	</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="password" className="">Password</label>
                  <div className="">
                    <input type="password" id="password" name="password" onChange={this._handleInputChange} className="form-control" placeholder="Password"  />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="second_password" className="">Confirm Password</label>
                  <div className="">
                    <input type="password" id="second_password" name="second_password" onChange={this._handleInputChange} className="form-control" placeholder="Confirm Password"  />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">Email</label>
                  <div className="">
                    <input type="text" id="email" name="email" onChange={this._handleInputChange} className="form-control" value={formState.email}  />
                  </div>
                </div>
	            	<div className={`form-group mb-2`}>
		              <label htmlFor="phone" className="">Phone</label>
		              <div className="">
		                <input type="text" id="phone" name="phone" onChange={this._handleInputChange} className="form-control" value={formState.phone}  />
		              </div>
	            	</div>
	            </li>
			        <li className="list-group-item">
                <div className="form-row">
  	            	<div className={`form-group mb-2 col-6`}>
                    <label htmlFor="team_id" className="">Team</label>
                    <div className="">
                      <Select
                        name="team_id"
                        options={teamOptions}
                        value={formState.team_id}
                        onChange={(value) => {
                          const event = {
                            target: {
                              name: 'team_id',
                              value: value ? value.value : ''
                            }
                          }

                          this._handleInputChange(event)
                        }}
                        />
                    </div>
                  </div>
                  <div className={`form-group mb-2 col-6`}>
                    <label htmlFor="roles" className="">Role</label>
                    <div className="">
                      <Select
                        name="roles"
                        options={roleOptions}
                        value={formState.roles.map(r => r.id)}
                        multi={true}
                        onChange={(value) => {
                          const event = {
                            target: {
                              name: 'roles',
                              value: value ? value.map(v => ({id: v.value})) : []
                            }
                          }

                          this._handleInputChange(event)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className={`form-group mb-2`}>
                  {customFields}
                </div>
              </li>
			      </ul>
          </div>
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  user: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
}

export default withRouter(connect((state, ownProps) => ({
  user: getUser(state, ownProps.match.params.id),
  teams: getTeams(state),
  roles: getRoles(state),
  fields: getFieldsForUsers(state)
}))(Record))
