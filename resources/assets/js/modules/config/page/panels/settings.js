import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as MDIcons from 'react-icons/lib/md'

class Settings extends React.Component {

	render() {
		return (
      <main className="col main-panel px-3">
        <h4 className="border-bottom py-3">
          Settings
        </h4>
        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Locale</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="currency" className="">Currency</label>
                  <div className="">
                    <input type="text" id="currency" name="currency" className="form-control" placeholder="$ USD" />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="datetime" className="">Date/Time Format</label>
                  <div className="">
                    <input type="text" id="datetime" name="datetime" className="form-control" placeholder="2018/03/30 3:40PM" />
                  </div>
                </div>

              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Language</div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="contact" className="">I call a contact</label>
                  <div className="">
                    <input type="text" id="contact" name="contact" className="form-control" placeholder="Contact" />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="company" className="">I call a company</label>
                  <div className="">
                    <input type="text" id="company" name="company" className="form-control" placeholder="Company" />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="opportunity" className="">I call an opportunity</label>
                  <div className="">
                    <input type="text" id="opportunity" name="opportunity" className="form-control" placeholder="Opportunity" />
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

Settings.propTypes = {

}

export default withRouter(connect((state, ownProps) => ({

}))(Settings))