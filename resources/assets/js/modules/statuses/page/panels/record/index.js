import React from 'react'
import {getStatus} from "../../../store/selectors"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._delete = this._delete.bind(this)

  }

  _submit() {
    this.props.dispatch(saveStatus(this.state.formState))
    this.props.dispatch(editingStatusFinished())
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let statusState = this.state.formState;

    // Set the value on the contact prop as well
    _.set(this.props.field, name, value)
  }

  _delete () {
    const { dispatch, status} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteField(status.id))
    }
  }

	render() {  
    const { status, user } = this.props

    if (this.props.status.id === null) {
      return 'my placeholder'
    }

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
	          <button className="float-right btn btn-primary mr-3 list-inline-item" onClick={this._submit}>Save</button>
          Edit Status: {status.name}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className={`form-group mb-2`}>
		              <label htmlFor="statusName" className="">Name</label>
		              <div className="">
		                <input type="text" id="statusName" name="statusName" onChange={this._handleInputChange} className="form-control" placeholder={status.name} />
		              </div>
	            	</div>
	            	<div className={`form-group mb-2`}>
		              <label htmlFor="statusColor" className="">Color</label>
		              <div className="">
		                <input type="text" id="statusColor" name="statusColor" onChange={this._handleInputChange} className="form-control" placeholder={status.color}  />
		              </div>
	            	</div>
	            </li>
			        <li className="list-group-item">
	            	<div className="row">
		            	<div className={`my-2 col`}>
			              <label className="switch float-left mr-2">
										  <input type="checkbox" />
										  <span className="toggle-slider round"></span>
										</label>
										<div className="pt-1">Published</div>
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
  status: getStatus(state, ownProps.match.params.id),
}))(Record))