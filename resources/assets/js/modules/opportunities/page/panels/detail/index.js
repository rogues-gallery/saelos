import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Contacts from '../../../../contacts/partials/_contacts'
import Notes from '../../../../notes/partials/_notes'
import Opportunity from '../../../Opportunity'
import {getFirstOpportunityId, getOpportunity} from '../../../store/selectors'

class Detail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {opportunity, dispatch, user} = this.props

    return (
      <div key={1} className="col detail-panel border-left">
        <div className="border-bottom text-center py-2 heading">
          <h5>Opportunity Details</h5>
        </div>
        <div className="h-scroll">
          <div className="card">
            <div className="card-header" id="headingOutcome">
              <h6 className="mb-0" data-toggle="collapse" data-target="#collapseOutcome" aria-expanded="true" aria-controls="collapseOutcome">
                <MDIcons.MdKeyboardArrowDown /> Opportunity Outcome
              </h6>
            </div>

            <div id="collapseOutcome" className="collapse show" aria-labelledby="headingOutcome">
              <div className="card-body border-bottom">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>
          <Contacts contacts={opportunity.contacts} dispatch={dispatch} />
          <Notes notes={opportunity.notes} dispatch={dispatch} entityId={opportunity.id} user={user} entityType="App\Deal" />
        </div>
      </div>
    )
  }
}

Detail.propTypes = {
  opportunity: PropTypes.instanceOf(Opportunity).isRequired,
  user: PropTypes.object.isRequired
}
export default withRouter(connect((state, ownProps) => ({
  opportunity: getOpportunity(state, ownProps.match.params.id || getFirstOpportunityId(state)),
  user: state.user
}))(Detail))