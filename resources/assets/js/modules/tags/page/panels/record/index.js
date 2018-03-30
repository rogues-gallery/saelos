import React from 'react'
import PropTypes from 'prop-types'
import {getTag} from "../../../store/selectors"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import { CirclePicker } from 'react-color'
import {deleteTag, fetchTag, saveTag} from "../../../service"
import moment from "moment/moment"

class Record extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._toggleEdit = this._toggleEdit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._delete = this._delete.bind(this)
    this._openRecord = this._openRecord.bind(this)

    this.state = {
      formState: props.tag.originalProps,
      pickerOpen: false,
      inEdit: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(fetchTag(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({formState: nextProps.tag.originalProps})
  }

  _submit() {
    this.props.dispatch(saveTag(this.state.formState)).then(this._toggleEdit)
  }

  _toggleEdit() {
    return this.setState({inEdit: !this.state.inEdit})
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
    const { dispatch, tag } = this.props

    if (confirm('Are you sure?')) {
      dispatch(deleteTag(tag.id))
    }
  }

  _openRecord(base, id) {
    this.context.router.history.push(`/${base}/${id}`)
  }

	render() {  
    const { tag } = this.props
    const { formState, pickerOpen, inEdit } = this.state
    const { contacts, opportunities, companies } = tag

    if (tag.id === null) {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">Select a tag on the left to edit.</h2>
        </main>
        )
    }

    return (
      <main className="col main-panel">
        <h4 className="border-bottom pl-3 py-3 mb-0">
          <div className="float-right ">
            <button className="btn btn-link list-inline-item" onClick={this._submit}>Delete</button>
            <button className="btn btn-primary mr-3 list-inline-item" onClick={this._toggleEdit}>Edit</button>
          </div>
          <span className="dot mr-1" style={{backgroundColor: tag.color}} /> {tag.name}
        </h4>

        {this.state.inEdit ?
          <div className="border-bottom"> {/* Do something to toggle inEdit */}
            <div className="card mx-2 my-2">
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
                      <input onFocus={() => this.setState({pickerOpen: true})} defaultValue={formState.color} className="form-control" style={{color: formState.color}} />
                      {pickerOpen ?
                        <CirclePicker
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
  	             <button className="btn btn-primary mr-3 list-inline-item" onClick={this._submit}>Save</button>
                 <button className="btn btn-link mr-3 list-inline-item" onClick={this._toggleEdit}>Cancel</button>
                </li>
  			      </ul>
            </div>
          </div>
        : '' }
        <div className="row no-gutters">
          <div className="col border-right pr-0">
            <div className="position-relative py-2 border-bottom">
              <div className="pt-1 mt-1 h5 text-center">
                Contacts
              </div>
            </div>
            <div className="list-group h-scroll">
              {contacts.map(contact => (
                <div
                  key={`contact-list-${contact.id}`}
                  onClick={() => this._openRecord('contacts', contact.id)}
                  className="list-group-item list-group-item-action align-items-start"
                >
                  <span className="text-muted mini-text float-right">{moment(contact.updated_at).fromNow()}</span>
                  <h6>{contact.first_name} {contact.last_name}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col border-right px-0">
            <div className="position-relative py-2 border-bottom">
              <div className="pt-1 mt-1 h5 text-center">
                Companies
              </div>
            </div>
            <div className="list-group h-scroll">
              {companies.map(company => (
                <div
                  key={`company-list-${company.id}`}
                  onClick={() => this._openRecord('companies', company.id)}
                  className="list-group-item list-group-item-action align-items-start"
                >
                  <span className="text-muted mini-text float-right">{moment(company.updated_at).fromNow()}</span>
                  <h6>{company.name}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col border-right pl-0">
            <div className="position-relative py-2 border-bottom">
              <div className="pt-1 mt-1 h5 text-center">
                Opportunities
              </div>
            </div>
            <div className="list-group h-scroll">
              {opportunities.map(opportunity => (
                <div
                  key={`opportunity-list-${opportunity.id}`}
                  onClick={() => this._openRecord('opportunities', opportunity.id)}
                  className="list-group-item list-group-item-action align-items-start"
                >
                  <span className="text-muted mini-text float-right">{moment(opportunity.updated_at).fromNow()}</span>
                  <h6>{opportunity.name}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

Record.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  tag: getTag(state, ownProps.match.params.id),
}))(Record))