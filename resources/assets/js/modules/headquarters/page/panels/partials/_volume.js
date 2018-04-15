import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import _ from 'lodash'

class Volume extends React.Component {
  render() {
    const { quota, total } = this.props
    const percent = _.floor((total/quota)*100)

    return (
      <div className="card">
        <div className="card-header" id="headingVolume">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseVolume" aria-expanded="true" aria-controls="collapseVolume">
            <MDIcons.MdKeyboardArrowDown /> Volume <span className="text-muted font-weight-normal">({percent}%)</span>
          </h6>
        </div>

        <div id="collapseVolume" className="collapse show mh-200" aria-labelledby="headingVolume">
          <div className="card-body border-bottom">
            <span className="text-muted pb-2"><b>Feature Coming Soon</b></span>
            <p className="text-muted">Your overall volume in this quarter is significantly under your quota levels. There are <b>23 contacts</b> assigned to you who have a status that may be ready to be updated.</p>
          </div>
        </div>
      </div>
    )
  }
}

Volume.propTypes = {
  quota: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default Volume
