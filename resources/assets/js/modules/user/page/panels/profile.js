import React from 'react'
import PropTypes from 'prop-types'
import {getUser} from "../../store/selectors"
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as MDIcons from 'react-icons/lib/md'
import {saveUser} from "../../../users/service";

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this._submit = this._submit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)

    this.state = {
      formState: props.user.originalProps
    }
  }

  // @todo: Abstract this out
  _handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    let name = target.name
    let { formState } = this.state

    _.set(formState, name, value)

    this.setState({
      formState
    });
  }

  _submit() {
    this.props.dispatch(saveUser(this.state.formState))
  }

	render() {
    const { user } = this.props
    const { formState } = this.state

		return (
      <main className="col main-panel px-3 full-panel">
        <h4 className="border-bottom py-3">
          <button className="float-right btn btn-primary list-inline-item" onClick={this._submit}>Save</button>
          My Profile
        </h4>
        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Personal</div>
                <div className="row">
                  <div className="col fw-100">
                   <label htmlFor="avatar">Photo</label>
                    { user.avatar ? <img src="" className="img-thumbnail w-100" /> : <div className="card"><div className="card-body p-2 text-center"><div className="h1 text-muted">{user.name.match(/\b(\w)/g).join('')}</div></div></div>}
                    <div className="text-center">
                      <button className="mt-2 btn btn-outline-primary btn-sm w-100"><span className="">Upload</span></button>
                    </div>
                  </div>
                  <div className="col">
                    <div className={`form-group mb-2`}>
                      <label htmlFor="name" className="">Name</label>
                      <div className="">
                        <input type="text" id="name" name="name" className="form-control" onChange={this._handleInputChange} placeholder="Name" defaultValue={formState.name} />
                      </div>
                    </div>
                    <div className={`form-group mb-2`}>
                      <label htmlFor="username" className="">Username</label>
                      <div className="">
                        <input type="text" id="username" name="username" className="form-control" onChange={this._handleInputChange} placeholder="Username" value={formState.username} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Contact</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">Email</label>
                  <div className="">
                    <input type="text" id="email" name="email" className="form-control" onChange={this._handleInputChange} placeholder="Email Address" defaultValue={formState.email} />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="phone" className="">Phone</label>
                  <div className="">
                    <input type="text" id="phone" name="phone" className="form-control" onChange={this._handleInputChange} placeholder="Phone" defaultValue={formState.phone} />
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

Profile.propTypes = {

}

export default withRouter(connect((state, ownProps) => ({
  user: getUser(state, ownProps.match.params.id),
}))(Profile))
