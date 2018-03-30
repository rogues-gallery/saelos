import React from 'react'
import {getTeam} from "../../../store/selectors"
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
    this.props.dispatch(saveTeam(this.state.formState))
    this.props.dispatch(editingTeamFinished())
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let teamState = this.state.formState;

    // Set the value on the contact prop as well
    _.set(this.props.field, name, value)
  }

  _delete () {
    const { dispatch, team} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteField(team.id))
    }
  }

	render() {  
    const { team, user } = this.props

    if (team.id === null) {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 class="text-muted text-center">Select a team on the left to edit.</h2>
        </main>
        )
    }

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
	          <button className="float-right btn btn-primary list-inline-item" onClick={this._submit}>Save</button>
        {team.name}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className={`form-group mb-2`}>
		              <label htmlFor="teamName" className="">Name</label>
		              <div className="">
		                <input type="text" id="teamName" name="teamName" onChange={this._handleInputChange} className="form-control" placeholder="Team Name" defaultValue={team.name} />
		              </div>
	            	</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="teamDescription" className="">Description</label>
                  <div className="">
                    <textarea id="stageName" name="stageName" onChange={this._handleInputChange} className="form-control" defaultValue={team.description} />
                  </div>
                </div>
	            </li>
			        <li className="list-group-item">
	            	<div className="form-group mb-2">
                  <label htmlFor="teamLeader" className="">Team Leader</label>
                  <input type="text" id="teamLeader" name="teamLeader" onChange={this._handleInputChange} className="form-control" placeholder="Leader" />
		            </div>
			        </li>
              <li className="list-group-item">
                <div className="form-group mb-2">
                  <label htmlFor="teamMembers" className="">Team Members</label>
                  <input type="text" id="teamMembers" name="teamMembers" onChange={this._handleInputChange} className="form-control" placeholder="Team Member" />
                </div>
                <div className="form-group mb-2">
                  <input type="text" id="teamMembers" name="teamMembers" onChange={this._handleInputChange} className="form-control" placeholder="Team Member" />
                </div>
                <div className="form-group mb-2">  
                  <input type="text" id="teamMembers" name="teamMembers" onChange={this._handleInputChange} className="form-control" placeholder="Team Member" />
                </div>
                <div className="form-group mb-2">  
                  <input type="text" id="teamMembers" name="teamMembers" onChange={this._handleInputChange} className="form-control" placeholder="Team Member" />
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
  team: getTeam(state, ownProps.match.params.id),
}))(Record))