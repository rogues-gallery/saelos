import React from 'react'
import PropTypes from 'prop-types'
import {getStatus} from "../../../store/selectors"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {fetchStatus, deleteStatus, saveStatus} from "../../../service"
import { CirclePicker} from 'react-color'
import _ from 'lodash'

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      formState: props.status.originalProps
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    if (this.props.match.params.id === 'new') {
      //dispatch(editingField())
    } else {
      dispatch(fetchStatus(this.props.match.params.id))
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({formState: nextProps.status.originalProps})
  }

  _submit() {
    this.props.dispatch(saveStatus(this.state.formState))
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    let name = target.name
    const { formState } = this.state

    _.set(formState, name, value);

    this.setState({
      formState
    })
  }

  _delete () {
    const { dispatch, status} = this.props

    dispatch(deleteStatus(status.id))
    this.context.router.history.push('/config/statuses')
  }

	render() {
    const { status, user } = this.props
    const { formState } = this.state

    //@TODO Simplify this check somehow/somewhere
    formState.color = formState.color === null ? '' : formState.color

    if (status.id === null && this.props.match.params.id !== 'new') {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">Select a status <span className="d-none d-lg-inline">on the left </span>to edit.</h2>
        </main>
        )
    }

    return (
      <main className="col main-panel px-3">
        <div className="list-inline pt-3 float-right">
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._delete}>Delete</button>
          <button className="btn btn-primary list-inline-item" onClick={this._submit}>Save</button>
        </div>
        <h4 className="border-bottom py-3">
          {formState.name ? formState.name : `New Status`}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className={`form-group mb-2`}>
		              <label htmlFor="statusName" className="">Name</label>
		              <div className="">
		                <input type="text" id="statusName" name="name" onChange={this._handleInputChange} className="form-control" value={formState.name} />
		              </div>
	            	</div>
	            	<div className={`form-group mb-2`}>
		              <label htmlFor="statusColor" className="">Color</label>
		              <div className="">
                  <CirclePicker
                    color={formState.color}
                    name="color"
                    width="100%"
                    circleSize={20}
                    circleSpacing={10}
                    onChangeComplete={(color) => {
                      const event = {
                        target: {
                          name: 'color',
                          value: color.hex
                        }
                      }

                      this._handleInputChange(event)
                    }}
                    placeholder={status.color} />
		              </div>
	            	</div>
	            </li>
			        <li className="list-group-item">
	            	<div className="row">
		            	<div className={`my-2 col`}>
			              <label className="switch float-left mr-2">
                      <input type="checkbox" name="published" checked={formState.published} onChange={this._handleInputChange} />
                      <span className="toggle-slider round" />
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

Record.propTypes = {
  status: PropTypes.object.isRequired
}

Record.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  status: getStatus(state, ownProps.match.params.id),
}))(Record))
