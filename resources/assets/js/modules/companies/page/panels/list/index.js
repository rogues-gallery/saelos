import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCompanies, fetchCompany } from '../../../service'
import moment from 'moment'
import { Money } from 'react-format'
import {getCustomFieldsForCompanies, getSearchStringForCompanies} from "../../../store/selectors";

class List extends React.Component {
  constructor(props) {
     super(props)

    this._onScroll = this._onScroll.bind(this)
    this._openRecord = this._openRecord.bind(this)
  }

  componentWillMount() {
    const { companies, dispatch, searchString } = this.props

    if (companies.length === 0) {
      dispatch(fetchCompanies({page: 1, searchString}))
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchCompanies({page: pagination.current_page + 1, searchString}))
    }
  }

  _openRecord(id) {
    const { dispatch } = this.props
    dispatch(fetchCompany(id))
    this.context.router.history.push(`/companies/${id}`)
  }

  render() {
    const { companies, searchString, firstCompanyId, inEdit, fields } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || firstCompanyId

    return (
      <div className={`col list-panel border-right ${inEdit ? 'inEdit' : ''}`}>
        <AdvancedSearch searchFunc={fetchCompanies} searchFields={fields} searchString={searchString} />
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {companies.map(company => (
            <div onClick={() => this._openRecord(company.id)}
                 className={`list-group-item list-group-item-action align-items-start ${company.id === activeIndex ? ' active' : ''}`}>
              <span className="text-muted mini-text float-right">{moment(company.updated_at).fromNow()}</span>
              <h6 className="text-truncate pr-1">{company.name}</h6>
              <p>Secondary Detail</p>
              <p className="text-muted"><Money>{_.sum(_.map(company.opportunities, 'amount'))}</Money> Opportunity Pipeline</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  companies: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string.isRequired
};

List.contextTypes = {
  router: PropTypes.object
}

export default connect(state => ({
  searchString: getSearchStringForCompanies(state),
  fields: getCustomFieldsForCompanies(state)
}))(List)