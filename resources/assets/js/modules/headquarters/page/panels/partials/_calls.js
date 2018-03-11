import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'

class Calls extends React.Component {
  render() {
    const { ...props } = this.props;

    return (
      <div className="card">
        <div className="card-header" id="headingCalls">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseCalls" aria-expanded="false" aria-controls="collapseCalls">
            <MDIcons.MdKeyboardArrowDown /> Calls <span className="text-muted font-weight-normal">(40%)</span>
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

export default Calls