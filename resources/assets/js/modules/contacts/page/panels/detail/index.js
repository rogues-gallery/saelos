import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import Opportunities from '../../../../opportunities/partials/_opportunities'
import SRI from '../../../../sri/partials/_sri'
import Contact from '../../../Contact'
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
        return <Details contact={this.props.contact} dispatch={this.props.dispatch} toggle={this._toggleView} user={this.props.user} inEdit={this.props.inEdit} />
      case 'history':
        return <History activities={this.props.contact.activities} dispatch={this.props.dispatch} fields={this.props.contact.fields} toggle={this._toggleView} inEdit={this.props.inEdit} />
    }
  }
}

const Details = ({contact, dispatch, toggle, user, inEdit}) => (
  <div key={1} className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom  py-2 heading">
        <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-fixed r-0 mr-2" onClick={() => toggle('history')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
        <div className="pt-1 mt-1 h5 text-center">
          Contact Details
        </div>
    </div>
    <div className="h-scroll">
      <div className="card ct-container">
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

      <Opportunities opportunities={contact.opportunities} dispatch={dispatch} />
      <Notes notes={contact.notes} dispatch={dispatch} entityType="App\Person" entityId={contact.id} user={user} />
    </div>
  </div>
)

const History = ({activities, dispatch, fields, toggle, inEdit}) => (
  <div key={1} className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="btn btn-xs btn-outline-secondary position-fixed ml-2 mt-1" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
      <div className="pt-1 mt-1 h5 text-center">History</div>
    </div>
    <div className="h-scroll history">
      {activities.map(activity => {
        const theChangedField = _.find(fields, f => f.alias === activity.field_alias)
        return(
          <div className="list-group-item" key={`activity-history-${activity.id}`}>
            <span className="text-muted float-right mini-text">{moment(activity.created_at).fromNow()}</span>
            <div className="activity"><b>{activity.title}</b></div>
            <div dangerouslySetInnerHTML={{__html: activity.description}} />
          </div>
          )
      })}
    </div>
  </div>
)

Detail.propTypes = {
  contact: PropTypes.instanceOf(Contact).isRequired,
  user: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id || getFirstContactId(state)),
  user: state.user,
  isFetching: isStateDirty(state)
}))(Detail))