import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'

const Opportunities = ({ opportunities }) => (
  <div className="card">
    <div className="card-header" id="headingOpportunities">
      <h6 className="mb-0" data-toggle="collapse" data-target="#collapseOpportunities" aria-expanded="true" aria-controls="collapseOpportunities">
        <MDIcons.MdArrowDropDownCircle /> Opportunities
      </h6>
    </div>

    <div id="collapseOpportunities" className="collapse show" aria-labelledby="headingOpportunities">
      <div className="card-body border-bottom">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
)

Opportunities.propTypes = {
  opportunities: PropTypes.array.isRequired
}

export default Opportunities