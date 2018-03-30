import React from 'react'
import {getStage} from "../../../store/selectors"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
import {fetchStage, saveStage, deleteStage} from "../../../service"

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      formState: props.stage.originalProps
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    if (this.props.match.params.id === 'new') {
      //dispatch(editingField())
    } else {
      dispatch(fetchStage(this.props.match.params.id))
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({formState: nextProps.stage.originalProps})
  }

  _submit() {
    this.props.dispatch(saveStage(this.state.formState))
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    const { formState } = this.state;

    // Set the value on the contact prop as well
    _.set(formState, name, value)

    this.setState({
      formState
    })
  }

  _delete () {
    const { dispatch, stage} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteStage(stage.id))

      this.context.router.history.push('/config/stages')
    }
  }

	render() {  
    const { stage, user } = this.props
    const { formState } = this.state

    if (stage.id === null) {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">Select a stage on the left to edit.</h2>
        </main>
        )
    }

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
	          <button className="float-right btn btn-primary list-inline-item" onClick={this._submit}>Save</button>
          Edit Stage: {formState.name}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className={`form-group mb-2`}>
		              <label htmlFor="stageName" className="">Name</label>
		              <div className="">
		                <input type="text" id="stageName" name="name" onChange={this._handleInputChange} className="form-control" value={formState.name} />
		              </div>
	            	</div>
								<div className={`form-group mb-2`}>
	              	<label htmlFor="stageProbability" className="">Probability</label>
		              <div className="">
		                <input type="text" id="stageProbability" name="probability" onChange={this._handleInputChange} className="form-control" value={formState.probability}  />
		              </div>
	            	</div>
	            	<div className={`form-group mb-2`}>
		              <label htmlFor="stageColor" className="">Color</label>
		              <div className="">
		                <input type="text" id="stageColor" name="color" onChange={this._handleInputChange} className="form-control" value={formState.color}  />
		              </div>
	            	</div>
	            </li>
			        <li className="list-group-item">
	            	<div className="row">
		            	<div className={`my-2 col`}>
			              <label className="switch float-left mr-2">
                      <input type="checkbox" name="active" checked={formState.active} onChange={this._handleInputChange} />
                      <span className="toggle-slider round" />
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