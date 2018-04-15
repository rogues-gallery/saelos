import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import _ from 'lodash'

class Team extends React.Component {
  render() {
    const { quota, total } = this.props
    const percent = _.floor((total/quota)*100)

    return (
      <div className="card">
        <div className="card-header" id="headingTeam">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseTeam" aria-expanded="false" aria-controls="collapseTeam">
            <MDIcons.MdKeyboardArrowDown /> Team <span className="text-muted font-weight-normal">({percent}%)</span>
          </h6>
        </div>

        <div id="collapseTeam" className="collapse mh-200" aria-labelledby="headingTeam">
          <div className="card-body border-bottom">
            <span className="text-muted pb-2"><b>Feature Coming Soon</b></span>
            <p className="text-muted">Your team relationships in this quarter is significantly below average. There are <b>23 contacts</b> assigned to you who have a status that may be ready to be updated.</p>
          </div>
        </div>
      </div>
    )
  }
}

Team.propTypes = {
  quota: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default Team
