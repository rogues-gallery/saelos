import React from 'react';
import PropTypes from 'prop-types';
import * as MDIcons from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'

import Opportunities from '../../../../opportunities/partials/_opportunities'
import Contacts from '../../../../contacts/partials/_contacts'
import Notes from '../../../../notes/partials/_notes'
import Company from '../../../Company'
import {getCompany, getFirstCompanyId} from '../../../store/selectors'
import { Link } from 'react-router-dom'
import { Money } from 'react-format'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "default"
    }

    this._toggleView = this._toggleView.bind(this)

  }

  _toggleView(view) {
    this.setState({view: view})
  }

  render() {
    const {dispatch, company, user} = this.props

    const data = {series: [[5, 4, 7, 3, 9]] }
    const options = {
            low: 0,
            fullWidth: true,
            showArea: true, 
            showLabel: false,
            axisX: {
              showGrid: true,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          }

    switch(this.state.view){
      case 'default':
        return <Details company={company} dispatch={dispatch} toggle={this._toggleView} user={user} data={data} options={options} />
      case 'history':
        return <History activities={company.activities} dispatch={dispatch}  toggle={this._toggleView} />
    }
  }
}

const Details = ({company, dispatch, toggle, user, data, options}) => {

  return (
  <div key={1} className="col detail-panel border-left">
    <div className="border-bottom text-center py-2 heading">
      <div className="justify-content-center">
        <a href="javascript:void(0)" className="btn btn-xs btn-outline-secondary float-right mr-2" onClick={() => toggle('history')}><span className="h5"><MDIcons.MdKeyboardArrowRight /></span></a>
        <div className="pt-1 mt-2 h5">Company Details</div>
      </div>
    </div>
    <div className="h-scroll">
      <div className="card ct-container">
        <div className="card-header" id="headingSRI">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseSRI" aria-expanded="true" aria-controls="collapseSRI">
            <MDIcons.MdKeyboardArrowDown /> Snapshot
          </h6>
        </div>

        <div id="collapseSRI" className="collapse show" aria-labelledby="headingSRI">
          <div className="card-body border-bottom">
            <div className="h1 text-center">$65,000</div>
            <div className="text-center mini-text text-muted text-uppercase pb-2"><MDIcons.MdAccessTime /> Current <span className="text-dark">Lifetime Value</span></div>
            <ScoreChart data={data} options={options} type="Line" />
            <div className="mini-text text-muted font-weight-bold text-uppercase mt-2">Active Pipeline</div>
            <p><Link className="hidden-link" to={`/opportunities/?searchString=${company.name}`}><Money>{_.sum(_.map(company.opportunities, 'amount'))}</Money> in open opportunities</Link></p>
          </div>
        </div>
      </div>

      <Contacts contacts={company.contacts} dispatch={dispatch} />
      <Opportunities opportunities={company.opportunities} dispatch={dispatch} />
      <Notes notes={company.notes} dispatch={dispatch} entityId={company.id} entityType="App\Company" user={user} />
    </div>
  </div>
)}

const History = ({activities, dispatch, toggle}) => (
  <div key={1} className="col detail-panel border-left">
    <div className="border-bottom text-center py-2 heading">
      <div className="justify-content-center">
        <a href="javascript:void(0)" className="btn btn-xs btn-outline-secondary float-left ml-2" onClick={() => toggle('default')}><span className="h5"><MDIcons.MdKeyboardArrowLeft /></span></a>
        <div className="pt-1 mt-2 h5">History</div>
      </div>
    </div>
  </div>
)

const ScoreChart = ({data, options, type}) => {
  return (
    <ChartistGraph data={data} options={options} type={type} className="sri-chart" />
  )
}

Detail.propTypes = {
  company: PropTypes.instanceOf(Company).isRequired,
  user: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  company: getCompany(state, ownProps.match.params.id || getFirstCompanyId(state)),
  user: state.user
}))(Detail))