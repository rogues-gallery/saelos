import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Opportunities from './components/opportunities'
import Contact from '../../../Contact'
import { getContact } from '../../../store/selectors'

class Detail extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div key={1} className="col detail-panel border-left">
        <div className="border-bottom text-center py-2 heading">
          <h5 className="pt-2 mb-1">Contact Details</h5>
        </div>
        <div className="h-scroll">
          <div className="card">
            <div className="card-header" id="headingSRI">
              <h6 className="mb-0" data-toggle="collapse" data-target="#collapseSRI" aria-expanded="true" aria-controls="collapseSRI">
                <MDIcons.MdArrowDropDownCircle /> Readiness Indicator
              </h6>
            </div>

            <div id="collapseSRI" className="collapse show" aria-labelledby="headingSRI">
              <div className="card-body border-bottom">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>

          <Opportunities opportunities={this.props.contact.opportunities} />

          <div className="card">
            <div className="card-header" id="headingNotes">
              <h6 className="mb-0" data-toggle="collapse" data-target="#collapseNotes" aria-expanded="true" aria-controls="collapseNotes">
                <MDIcons.MdArrowDropDownCircle /> Notes
              </h6>
            </div>

            <div id="collapseNotes" className="collapse show" aria-labelledby="headingNotes">
              <div className="card-body border-bottom">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Detail.propTypes = {
  contact: PropTypes.instanceOf(Contact).isRequired
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id)
}))(Detail))