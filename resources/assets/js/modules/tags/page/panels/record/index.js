import React from 'react'
import {getTag} from "../../../store/selectors"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import { TwitterPicker } from 'react-color'
import {deleteTag, saveTag} from "../../../service";

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._delete = this._delete.bind(this)

    this.state = {
      formState: props.tag.originalProps,
      pickerOpen: false
    }
  }

  _submit() {
    this.props.dispatch(saveTag(this.state.formState))
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let tagState = this.state.formState;

    // Set the value on the contact prop as well
    _.set(tagState, name, value)

    this.setState({
      formState: tagState,
      pickerOpen: false
    })
  }

  _delete () {
    const { dispatch, tag} = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteTag(tag.id))
    }
  }

	render() {  
    const { tag } = this.props
    const { formState, pickerOpen } = this.state

    if (tag.id === null) {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">Select a tag on the left to edit.</h2>
        </main>
        )
    }

    return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
          <button className="float-right btn btn-primary mr-3 list-inline-item" onClick={this._submit}>Save</button>
          Edit Tag: {tag.name}
        </h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
			        <li className="list-group-item">
			          <div className={`form-group mb-2`}>
		              <label htmlFor="tagName" className="">Name</label>
		              <div className="">
		                <input type="text" id="tagName" name="name" onChange={this._handleInputChange} className="form-control" value={formState.name} />
		              </div>
	            	</div>
	            	<div className={`form-group mb-2`}>
		              <label htmlFor="tagColor" className="">Color</label>
		              <div className="">
                    <input readOnly onFocus={() => this.setState({pickerOpen: true})} value={formState.color} className="form-control" style={{color: formState.color}} />
                    {pickerOpen ?
                      <TwitterPicker
                        color={formState.color}
                        name="tagColor"
                        onChangeComplete={(color) => {
                          const event = {
                            target: {
                              name: 'color',
                              value: color.hex
                            }
                          }

                          this._handleInputChange(event)
                        }}
                        placeholder={tag.color} />
                      : ''}
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
  tag: getTag(state, ownProps.match.params.id),
}))(Record))