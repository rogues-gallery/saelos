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
        <div className="toolbar border-bottom py-2 heading list-inline">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item"><span className="h5"><MDIcons.MdAllInclusive /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdPlaylistAdd /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h3"><MDIcons.MdInput /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdInsertChart /></span></button>

          <div className="float-right text-right pt-2">
          </div>
        </div>
        <h4 className="border-bottom py-3">
          Settings
        </h4>
      </main>
    )
	}
}

Settings.propTypes = {

}

export default withRouter(connect((state, ownProps) => ({

}))(Settings))