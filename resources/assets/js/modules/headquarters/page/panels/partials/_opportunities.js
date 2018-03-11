import React from 'react'
import PropTypes from 'prop-types'
import * as MDIcons from 'react-icons/lib/md'

class Opportunities extends React.Component {
  render() {
    const { ...props } = this.props;

    return (
      <div className="card">
        <div className="card-header" id="headingOpportunities">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseOpportunities" aria-expanded="false" aria-controls="collapseOpportunities">
            <MDIcons.MdKeyboardArrowDown /> Opportunities <span className="text-muted font-weight-normal">(30%)</span>
          </h6>
        </div>

        <div id="collapseOpportunities" className="collapse mh-200" aria-labelledby="headingOpportunities">
          <div className="card-body border-bottom">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          </div>
        </div>
      </div>
    )
  }
}

export default Opportunities