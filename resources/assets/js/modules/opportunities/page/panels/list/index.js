import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOpportunities, fetchOpportunity } from "../../../service"
import { Money } from 'react-format'
import { getUser } from '../../../../user/store/selectors'
import {getCustomFieldsForOpportunities, getSearchStringForOpportunities, getOpportunities, getPaginationForOpportunities} from "../../../store/selectors"
import AdvancedSearch from '../../../../../common/search'
import {isInEdit} from "../../../../opportunities/store/selectors";

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._openRecord = this._openRecord.bind(this)
  }

  componentWillMount() {
    const { opportunities, dispatch, searchString } = this.props

    if (opportunities.length === 0) {
      dispatch(fetchOpportunities({page: 1, searchString}))
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchOpportunities({page: pagination.current_page + 1, searchString}))
    }
  }

  _openRecord(id) {
    const { dispatch } = this.props
    dispatch(fetchOpportunity(id))
    this.context.router.history.push(`/opportunities/${id}`)
  }

  render() {
    const { opportunities, searchString, inEdit, fields, user } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id)

    return (
      <div className={`col list-panel border-right ${inEdit ? 'inEdit' : ''}`}>
        <AdvancedSearch searchFunc={fetchOpportunities} searchFields={fields} searchString={searchString} parentItem='opportunities'  />
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {opportunities.map(opportunity => (
            <div
              key={`opportunity-list-${opportunity.id}`}
              onClick={() => this._openRecord(opportunity.id)}
              className={`list-group-item list-group-item-action align-items-start ${opportunity.id === activeIndex ? 'active' : ''} ${opportunity.user.id === user.id ? 'corner-flag' : ''}`}
            >
              <span className="text-muted mini-text float-right"><Money>{opportunity.amount}</Money></span>
              <h6 className="text-truncate pr-1">{opportunity.name}</h6>
              <p>{opportunity.company.name}</p>
              <p className="text-muted">{opportunity.stage.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  opportunities: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string,
  fields: PropTypes.object.isRequired
};

List.contextTypes = {
  router: PropTypes.object
}

export default connect(state => ({
  opportunities: getOpportunities(state),
  searchString: getSearchStringForOpportunities(state),
  fields: getCustomFieldsForOpportunities(state),
  inEdit: isInEdit(state),
  user: getUser(state),
  pagination: getPaginationForOpportunities(state)
}))(List)
