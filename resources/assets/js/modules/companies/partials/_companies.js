import React from 'react'
import PropTypes from 'prop-types'
import { fetchCompany } from "../../companies/service"
import * as MDIcons from 'react-icons/lib/md'

class Companies extends React.Component {
  render() {
    const { companies, dispatch } = this.props;
    return (
      <div className="card">
        <div className="card-header" id="headingCompanies">
          <h6 className="mb-0" data-toggle="collapse" data-target="#collapseCompanies" aria-expanded="true" aria-controls="collapseCompanies">
            <MDIcons.MdKeyboardArrowDown /> Companies <span className="text-muted font-weight-normal">({companies.length})</span>
          </h6>
        </div>

        <div id="collapseCompanies" className="collapse show mh-200" aria-labelledby="headingCompanies">
          <div className="list-group border-bottom">
            {companies.map(company => <Company key={company.id} company={company} router={this.context.router} dispatch={dispatch} />)}
          </div>
        </div>
      </div>
    )
  }
}

const Company = ({ company, dispatch, router }) => {
  const openCompanyRecord = (id) => {
    dispatch(fetchCompany(company.id))
    router.history.push(`/companies/${id}`)
  }

  return (
    <div onClick={() => openCompanyRecord(company.id)} className="list-group-item list-group-item-action align-items-start">
      <p className="mini-text text-muted float-right" />
      <p><strong>{company.name}</strong>
        <br />Secondary Detail</p>
    </div>
  )
}

Companies.propTypes = {
  companies: PropTypes.array.isRequired
}

Companies.contextTypes = {
  router: PropTypes.object
}

export default Companies