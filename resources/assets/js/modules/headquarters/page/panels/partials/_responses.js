import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'

class Responses extends React.Component {
  render() {
    const { ...props } = this.props;

    return (
      <div className="card">
        <div className="card-header" id="headingResponses">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseResponses" aria-expanded="false" aria-controls="collapseResponses">
            <MDIcons.MdKeyboardArrowDown /> Responses <span className="text-muted font-weight-normal">(58%)</span>
          </h6>
        </div>

        <div id="collapseResponses" className="collapse mh-200" aria-labelledby="headingResponses">
          <div className="card-body border-bottom">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          </div>
        </div>
      </div>
    )
  }
}

export default Responses