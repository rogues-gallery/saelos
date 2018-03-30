import React from 'react'
import {getUser} from "../../../store/selectors"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._delete = this._delete.bind(this)

  }

  _submit() {
    this.props.dispatch(saveUser(this.state.formState))
    this.props.dispatch(editingUserFinished())
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let userState = this.state.formState;

    // Set the value on the contact prop as well
    _.set(this.props.field, name, value)
  }

  _delete () {
    const { dispatch, user} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteField(user.id))
    }
  }

	render() {  
    const { user } = this.props

    if (user.id === null) {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 class="text-muted text-center">Select a user on the left to edit.</h2>
        </main>
        )
    }

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
	          <button className="float-right btn btn-primary list-inline-item" onClick={this._submit}>Save</button>
          Edit User: {user.name}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className={`form-group mb-2`}>
		              <label htmlFor="userName" className="">Name</label>
		              <div className="">
		                <input type="text" id="userName" name="userName" onChange={this._handleInputChange} className="form-control" value={user.name} />
		              </div>
	            	</div>
								<div className={`form-group mb-2`}>
	              	<label htmlFor="userUserName" className="">Username</label>
		              <div className="">
		                <input type="text" id="userUserName" name="userUserName" onChange={this._handleInputChange} className="form-control" value={user.username}  />
		              </div>
	            	</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="userPassword" className="">Password</label>
                  <div className="">
                    <input type="password" id="userPassword" name="userPassword" onChange={this._handleInputChange} className="form-control" placeholder="Password"  />
                  </div>
                </div>                
                <div className={`form-group mb-2`}>
                  <label htmlFor="userEmail" className="">Email</label>
                  <div className="">
                    <input type="text" id="userEmail" name="userEmail" onChange={this._handleInputChange} className="form-control" value={user.email}  />
                  </div>
                </div>
	            	<div className={`form-group mb-2`}>
		              <label htmlFor="userPhone" className="">Phone</label>
		              <div className="">
		                <input type="text" id="userPhone" name="userPhone" onChange={this._handleInputChange} className="form-control" value={user.phone}  />
		              </div>
	            	</div>
	            </li>
			        <li className="list-group-item">
	            	<div className={`form-group mb-2`}>
                  <label htmlFor="userTeam" className="">Team</label>
                  <div className="">
                    <input type="text" id="userTeam" name="userTeam" onChange={this._handleInputChange} className="form-control" value={user.team.name}  />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="userRole" className="">Role</label>
                  <div className="">
                    <input type="text" id="userRole" name="userRole" onChange={this._handleInputChange} className="form-control" value={user.role}  />
                  </div>
                </div>
              </li>
			      </ul>
          </div>
        </div>
      </main>
    )
  }
}

export default withRouter(connect((state, ownProps) => ({
  user: getUser(state, ownProps.match.params.id),
}))(Record))