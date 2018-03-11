import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Opportunities from '../../../../opportunities/partials/_opportunities'
import SRI from '../../../../sri/partials/_sri'
import Headquarters from '../../../Headquarters'
import Notes from '../../../../notes/partials/_notes'
import {getContact, getFirstContactId, isStateDirty} from '../../../store/selectors'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "default"
    }

    this._toggleView = this._toggleView.bind(this)
  }

  _toggleView(view) {
    this.setState({view})
  }

  render() {
    switch(this.state.view) {
      case 'default':
        return <Details contact={this.props.contact} dispatch={this.props.dispatch} toggle={this._toggleView} user={this.props.user} />
      case 'history':
        return <History activities={this.props.contact.activities} dispatch={this.props.dispatch}  toggle={this._toggleView} />
    }
  }
}

const Details = ({contact, dispatch, toggle, user}) => (
  <div key={1} className="col detail-panel border-left">
    <div className="border-bottom text-center py-2 heading">
      <div className="dropdown justify-content-center">
        <div className="mt-2 h5 dropdown-toggle" id="detailViewToggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Contact Details</div>
        <div className="dropdown-menu" aria-labelledby="detailViewToggle">
          <div className="dropdown-item h5 mb-0 disabled text-center">Contact Details</div>
          <div className="dropdown-item h5 mb-0 text-center" onClick={() => toggle('history')}>History</div>
        </div>
      </div>
    </div>
    <div className="h-scroll">
      <div className="card">
        <div className="card-header" id="headingSRI">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseSRI" aria-expanded="true" aria-controls="collapseSRI">
            <MDIcons.MdKeyboardArrowDown /> Readiness Indicator
          </h6>
        </div>

        <div id="collapseSRI" className="collapse show" aria-labelledby="headingSRI">
          <div className="card-body border-bottom">
            <SRI />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const History = ({activities, dispatch, toggle}) => (
  <div key={1} className="col detail-panel border-left">
    <div className="border-bottom text-center py-2 heading">
      <div className="dropdown justify-content-center">
        <div className="mt-2 h5 dropdown-toggle" id="detailViewToggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">History</div>
        <div className="dropdown-menu" aria-labelledby="detailViewToggle">
          <div className="dropdown-item h5 mb-0 disabled text-center">History</div>
          <div className="dropdown-item h5 mb-0 text-center" onClick={() => toggle('default')}>Contact Details</div>
        </div>
      </div>
    </div>
  </div>
)

Detail.propTypes = {
  user: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  user: state.user,
}))(Detail))