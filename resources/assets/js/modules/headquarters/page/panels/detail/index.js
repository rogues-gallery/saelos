import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchContact, saveContact } from '../../../../contacts/service';
import {getContact, getCustomFieldsForContacts, isStateDirty, getFirstContactId} from '../../../../contacts/store/selectors';
import Headquarters from '../../../Headquarters'
import Notes from '../../../../notes/partials/_notes'

import Volume from '../partials/_volume'
import Email from '../partials/_email'
import Calls from '../partials/_calls'
import Team from '../partials/_team'
import Opportunities from '../partials/_opportunities'
import Responses from '../partials/_responses'


import * as MDIcons from 'react-icons/lib/md'
import ChartistGraph from 'react-chartist';

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "default"
    }

    this._toggleView = this._toggleView.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchContact(this.props.contact.id))
  }

  componentWillReceiveProps(next) {
    this.setState({formState: next.contact.originalProps})
  }


  _toggleView(view) {
    this.setState({view})
  }

  render() {
    switch(this.state.view) {
      case 'default':
        return <Details contact={this.props.contact} dispatch={this.props.dispatch} toggle={this._toggleView} user={this.props.user} />
      case 'contact_notes':
        return <ContactNotes contact={this.props.contact} notes={this.props.contact.notes} dispatch={this.props.dispatch}  toggle={this._toggleView} user={this.props.user} />
    }
  }
}

const Details = ({contact, dispatch, toggle, user}) => {

  const data = {labels: ['V', 'E', 'C', 'T', 'O', 'R'], series: [[4, 5, 6, 7, 5, 8], [10,10,10,10,10,10]] }
  const options = {
          high: 10,
          low: 0,
          stackBars: true,
          fullWidth: true,
          showArea: true, 
          // showLabel: true,
          axisX: {
            showGrid: false,
            showLabel: true,
            // offset: 0
          },
          axisY: {
            showGrid: true,
            showLabel: false,
            offset: 0
          }
        }
  return (
    <div key={1} className="col detail-panel border-left">
      <div className="border-bottom text-center py-2 heading">
        <div className="justify-content-center">
          <a href="javascript:void(0)" className="btn btn-xs btn-outline-secondary float-right mr-2" onClick={() => toggle('contact_notes')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
          <div className="pt-1 mt-2 h5">VECTOR</div>
        </div>
      </div>
      <div className="h-scroll">
        <div className="card ct-container">
          <div className="card-header" id="headingVector">
            <h6 className="mb-0" data-toggle="collapse" data-target="#headingVector" aria-expanded="true" aria-controls="collapseSRI">
              <MDIcons.MdKeyboardArrowDown /> Summary
            </h6>
          </div>

          <div id="collapseVector" className="collapse show" aria-labelledby="headingVector">
            <div className="card-body border-bottom">
              <VectorChart data={data} options={options} type="Bar" />
            </div>
          </div>

        </div>

        <Volume />
        <Email />
        <Calls />
        <Team />
        <Opportunities />
        <Responses />

      </div>
    </div>
  )
}

const VectorChart = ({data, options, type}) => {
  return (
    <div className="vectorGraph">
      <div className="h1 text-center">74%</div>
      <div className="text-center mini-text text-muted text-uppercase pb-2"><span className="text-success h5"><MDIcons.MdArrowDropUp /></span><span className="text-dark">23% improvement</span> since last week</div>
      <ChartistGraph data={data} options={options} type={type} className="vector-graph" />
    </div>
  )
}

const ContactNotes = ({contact, notes, dispatch, toggle, user}) => (
  <div key={1} className="col detail-panel border-left">
    <div className="border-bottom text-center py-2 heading">
      <div className="justify-content-center">
        <a href="javascript:void(0)" className="btn btn-xs btn-outline-secondary float-left ml-2" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
        <div className="pt-1 mt-2 h5">Notes</div>
      </div>
    </div>
    <div className="h-scroll">
      <Notes notes={notes} dispatch={dispatch} entityType="App\Person" entityId={contact.id} user={user} />
    </div>
  </div>
)

Detail.propTypes = {
  contact: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  contact: getContact(state, ownProps.match.params.id || getFirstContactId(state)),
  user: state.user,
}))(Detail))