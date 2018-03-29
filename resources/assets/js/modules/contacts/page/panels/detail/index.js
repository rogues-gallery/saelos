import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import Opportunities from '../../../../opportunities/partials/_opportunities'
import Companies from "../../../../companies/partials/_companies"
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
    const { contact, dispatch, user, inEdit } = this.props

    if (contact.id === null) {
      return ''
    }

    switch(this.state.view) {
      case 'default':
        return <Details contact={contact} dispatch={dispatch} toggle={this._toggleView} user={user} inEdit={inEdit} />
      case 'history':
        return <History activities={contact.activities} dispatch={dispatch} toggle={this._toggleView} inEdit={inEdit} />
    }
  }
}

const Details = ({contact, dispatch, toggle, user, inEdit}) => (
  <div className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom  py-2 heading">
        <a href="javascript:void(0)" className="mt-1 btn btn-xs btn-outline-secondary position-fixed r-0 mr-2" onClick={() => toggle('history')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
        <div className="pt-1 mt-1 h5 text-center">
          Contact Details
        </div>
    </div>
    <div className="h-scroll">
      <Opportunities opportunities={contact.opportunities} dispatch={dispatch} entityType="App\Contact" entityId={contact.id} />
      <Companies companies={contact.companies} dispatch={dispatch} entityType="App\Contact" entityId={contact.id} />
      <Notes notes={contact.notes} dispatch={dispatch} entityType="App\Contact" entityId={contact.id} user={user} />
    </div>
  </div>
)

const History = ({activities, dispatch, toggle, inEdit}) => (
  <div className={`col detail-panel border-left ${inEdit ? 'inEdit' : ''}`}>
    <div className="border-bottom py-2 heading">
      <a href="javascript:void(0)" className="btn btn-xs btn-outline-secondary position-fixed ml-2 mt-1" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
      <div className="pt-1 mt-1 h5 text-center">History</div>
    </div>
    <div className="h-scroll history">
      {activities.map(activity => (
          <div className="list-group-item" key={`activity-history-${activity.id}`}>
            <span className="text-muted float-right mini-text">{moment(activity.created_at).fromNow()}</span>
            <div className="activity"><b>{activity.name}</b></div>
            <div dangerouslySetInnerHTML={{__html: activity.description}} />
          </div>
          ))}
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