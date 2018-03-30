import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { fetchContact, fetchContacts } from '../../../service'
import {getSearchStringForContacts, getCustomFieldsForContacts, getContacts, getPaginationForContacts} from "../../../store/selectors"
import AdvancedSearch from '../../../../../common/search'
import {isInEdit} from "../../../../companies/store/selectors";

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._openRecord = this._openRecord.bind(this)
  }

  componentWillMount() {
    const { contacts, dispatch, searchString } = this.props

    if (contacts.length === 0) {
      dispatch(fetchContacts({page: 1, searchString}))
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchContacts({page: pagination.current_page + 1, searchString}))
    }
  }

  _openRecord(id) {
    const { dispatch } = this.props
    dispatch(fetchContact(id))
    this.context.router.history.push(`/contacts/${id}`)
  }

  render() {
    const { router } = this.context
    const { contacts, inEdit, fields, searchString } = this.props
    const activeIndex = parseInt(router.route.match.params.id)

    return (
      <div className={`col list-panel border-right ${inEdit ? 'inEdit' : ''}`}>
        <AdvancedSearch searchFunc={fetchContacts} searchFields={fields} searchString={searchString} />
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {contacts.map(contact => (
            <div
              key={`contact-list-${contact.id}`}
              onClick={() => this._openRecord(contact.id)}
              className={`list-group-item list-group-item-action align-items-start ${contact.id === activeIndex ? ' active' : ''}`}
            >
              <span className="text-muted mini-text float-right">{moment(contact.updated_at).fromNow()}</span>
              <h6>{contact.first_name} {contact.last_name}</h6>
              <p>{contact.company.name}</p>
              <p className="text-muted">{contact.status.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired
};

List.contextTypes = {
  router: PropTypes.object
}

export default connect(state => ({
  searchString: getSearchStringForContacts(state),
  fields: getCustomFieldsForContacts(state),
  contacts: getContacts(state),
  inEdit: isInEdit(state),
  pagination: getPaginationForContacts(state)
}))(List)