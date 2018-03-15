import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'

class TaskAction extends Component {
  constructor(props) {
    super(props)

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleContentChange = this._handleContentChange.bind(this)
    this._submit = this._submit.bind(this)

    this.state = {
      formState: {

      }
    }
  }

  _handleInputChange(event) {
    const { target } = event
    const { name, value } = target
    const { formState } = this.state

    formState[name] = value

    this.setState({
      formState
    });
  }

  _handleContentChange(value) {
    const { formState } = this.state

    this.setState({
      formState
    })
  }

  _submit() {
    this.props.dispatch()
  }

  render() {
  	return(
		  <div className="card-body taskActionView">
		  	<div className="form-row">
			    <div className="form-group col-md-8">
			      <label htmlFor="task_name">Task Name</label>
			      <input type="text" className="form-control" name="task_name" placeholder="Enter task name" />
			    </div>
			    <div className="form-group col-md-4">
			      <label htmlFor="due_date">Due Date</label>
			      <input type="text" className="form-control" name="due_date" placeholder="Enter due date" />
			    </div>
			  </div>
			  <div className="form-row">
			  	<div className="form-group col">
			  		<ReactQuill name="task_description" onChange={this._handleContentChange} />
			  	</div>
			  </div>
		    <div className="form-row">
		    	<div className="col-md-6">
		    		<button className="btn btn-primary">Send</button><button className="btn btn-link text-muted">Cancel</button>
		    	</div>
		    	<div className="col-md-3">
		    		Opportunity List
		    	</div>
		    	<div className="col-md-3">
		    		Company List
		    	</div>
		    </div>
		  </div>
		)
 }
}
export default TaskAction