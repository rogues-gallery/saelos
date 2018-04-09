import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'
import _ from 'lodash'

class Calls extends React.Component {
  render() {
    const { quota, total } = this.props
    const percent = _.floor((total/quota)*100)

    return (
      <div className="card">
        <div className="card-header" id="headingCalls">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseCalls" aria-expanded="false" aria-controls="collapseCalls">
            <MDIcons.MdKeyboardArrowDown /> Calls <span className="text-muted font-weight-normal">({percent}%)</span>
          </h6>
        </div>

        <div id="collapseCalls" className="collapse mh-200" aria-labelledby="headingCalls">
          <div className="card-body border-bottom">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          </div>
        </div>
      </div>
    )
  }
}

Calls.propTypes = {
  quota: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default Calls