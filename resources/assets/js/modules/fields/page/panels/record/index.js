import React from 'react'
import {getField} from "../../../store/selectors"
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
    this.props.dispatch(saveField(this.state.formState))
    this.props.dispatch(editingFieldFinished())
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let fieldState = this.state.formState;

    // Set the value on the contact prop as well
    _.set(this.props.field, name, value)
  }

  _delete () {
    const { dispatch, field} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteField(field.id))
    }
  }

	render() {  
    const { field, user } = this.props

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
	          <button className="float-right btn btn-primary mr-3 list-inline-item" onClick={this._submit}>Save</button>
          Edit Field: {field.label}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className="mini-text text-muted mb-2">Core</div>
			          <div className={`form-group mb-2`}>
		              <label htmlFor={field.label} className="">Name</label>
		              <div className="">
		                <input type="text" id={field.label} name={field.label} onChange={this._handleInputChange} className="form-control" placeholder={field.label} />
		              </div>
	            	</div>
								<div className={`form-group mb-2`}>
	              	<label htmlFor={field.group} className="">Type</label>
		              <div className="">
		                <input type="text" id={field.alias} name={field.alias} onChange={this._handleInputChange} className="form-control"  />
		              </div>
	            	</div>

			        </li>
			        <li className="list-group-item">
			        <div className="mini-text text-muted mb-2">Options</div>
			          <div className={`form-group mb-2`}>
	              	<label htmlFor={field.object} className="">Object</label>
		              <div className="">
		                <input type="text" id={field.object} name={field.object} onChange={this._handleInputChange} className="form-control" placeholder="Select list w/ Company, Contact, Opportunity" />
		              </div>
	            	</div>
			          <div className={`form-group mb-2`}>
		              <label htmlFor={field.group} className="">Group</label>
		              <div className="">
		                <input type="text" id={field.group} name={field.group} onChange={this._handleInputChange} className="form-control" placeholder="Select list w/ Core, Social, Professional, Additional"  />
		              </div>
	            	</div>
	            	<div className={`form-group mb-2`}>
		              <label htmlFor={field.order} className="">Order</label>
		              <div className="">
		                <input type="text" id={field.order} name={field.order} onChange={this._handleInputChange} className="form-control"  />
		              </div>
	            	</div>
	            	<div className="row">
		            	<div className={`my-2 col`}>
			              <label className="switch float-left mr-2">
										  <input type="checkbox" />
										  <span className="toggle-slider round"></span>
										</label>
										<div className="pt-1">Hidden</div>
		            	</div>
		            	<div className={`my-2 col`}>
			              <label className="switch float-left mr-2">
										  <input type="checkbox" />
										  <span className="toggle-slider round"></span>
										</label>
										<div className="pt-1">Required</div>
		            	</div>

		            	<div className={`my-2 col`}>
			              <label className="switch float-left mr-2">
										  <input type="checkbox" />
										  <span className="toggle-slider round"></span>
										</label>
										<div className="pt-1">Searchable</div>
		            	</div>

		            	<div className={`my-2 col`}>
			              <label className="switch float-left mr-2">
										  <input type="checkbox" />
										  <span className="toggle-slider round"></span>
										</label>
										<div className="pt-1">Summary</div>
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
  field: getField(state, ownProps.match.params.id),
}))(Record))