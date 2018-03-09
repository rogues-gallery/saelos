import React from 'react'
import PropTypes from 'prop-types'
import { fetchCompanies, fetchCompany } from '../../../service'
import moment from 'moment'

class List extends React.Component {
  componentWillMount() {
    if (this.props.companies.length === 0) {
      this.props.dispatch(fetchCompanies()) 
    }
  }

  render() {
    const { companies, dispatch, searchString } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || companies[0].id

    return (
      <div className="col list-panel border-right">
          <div className="px-4 pt-4 bg-white border-bottom">
            <form>
              <input
              type="search"
              className="form-control ds-input"
              id="search-input"
              placeholder="Search..."
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0"
              dir="auto"
              style={{position:"relative", verticalAlign:"top"}}
              />
            </form>
            <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Active</b></div> <div className="text-muted col"><b>All</b></div></div>
          </div>
        <div className="list-group h-scroll">
          {companies.map(company => <Company key={company.id} company={company} dispatch={this.props.dispatch} router={this.context.router} activeID={activeIndex} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  companies: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool
};

List.contextTypes = {
  router: PropTypes.object
}

const Company = ({ company, dispatch, router, activeID }) => {
  const openCompanyRecord = (id) => {
    dispatch(fetchCompany(company.id))
    router.history.push(`/companies/${id}`)
  }

  return (
    <div onClick={() => openCompanyRecord(company.id)}
    className={`list-group-item list-group-item-action align-items-start ${company.id === parseInt(activeID) ? ' active' : ''}`}>
      <span className="text-muted mini-text float-right">{moment(company.updated_at).fromNow()}</span>
      <h6>{company.name}</h6>
      <p>Secondary Detail</p>
      <p className="text-muted">Tertiary Information</p>
    </div>
  );
}

Company.propTypes = {
  company: PropTypes.object.isRequired
};

export default List