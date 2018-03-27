import React from 'react'
import {getStage} from "../../../store/selectors";``
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
    this.props.dispatch(saveStage(this.state.formState))
    this.props.dispatch(editingStageFinished())
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let stageState = this.state.formState;

    // Set the value on the contact prop as well
    _.set(this.props.field, name, value)
  }

  _delete () {
    const { dispatch, stage} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteField(stage.id))
    }
  }

	render() {  
    const { stage, user } = this.props

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
	          <button className="float-right btn btn-primary mr-3 list-inline-item" onClick={this._submit}>Save</button>
          Edit Stage: {stage.name}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className={`form-group mb-2`}>
		              <label htmlFor="stageName" className="">Name</label>
		              <div className="">
		                <input type="text" id="stageName" name="stageName" onChange={this._handleInputChange} className="form-control" placeholder={stage.name} />
		              </div>
	            	</div>
								<div className={`form-group mb-2`}>
	              	<label htmlFor="stageProbability" className="">Probability</label>
		              <div className="">
		                <input type="text" id="stageProbability" name="probability" onChange={this._handleInputChange} className="form-control" placeholder={stage.probability}  />
		              </div>
	            	</div>
	            	<div className={`form-group mb-2`}>
		              <label htmlFor="stageColor" className="">Color</label>
		              <div className="">
		                <input type="text" id="stageColor" name="stageColor" onChange={this._handleInputChange} className="form-control" placeholder={stage.color}  />
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
										<div className="pt-1">Active</div>
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
  stage: getStage(state, ownProps.match.params.id),
}))(Record))