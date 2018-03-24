import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { fetchContacts, fetchContact } from '../../../service'
import { getSearchStringForContacts, getCustomFieldsForContacts } from "../../../store/selectors"
import AdvancedSearch from '../../../../../common/search'

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
    this._activateAdvancedSearch = this._activateAdvancedSearch.bind(this)
    this._updateSearchString = this._updateSearchString.bind(this)

    this.state = {
      searchString: props.searchString,
      advancedSearch: false
    }
  }

  componentWillMount() {
    const { contacts, dispatch, searchString } = this.props

    if (contacts.length === 0) {
      dispatch(fetchContacts({page: 1, searchString}))
    }
  }

  _onKeyPress(event) {
    const { target, charCode } = event

    if (charCode !== 13) {
      return
    }

    event.preventDefault()

    this._submit(target)
  }

  _submit(input) {
    const { value } = input
    const { dispatch } = this.props

    if (value.length >= 3) {
      dispatch(fetchContacts({page: 1, searchString: value}))
    } else if (value.length === 0) {
      this.setState({
        searchString: ''
      })

      dispatch(fetchContacts({page: 1, searchString: ''}))
    }

    this.setState({
      advancedSearch: false
    })
  }

  _updateSearchString(string) {
    this.setState({
      searchString: `${this.state.searchString}${string}`.trim(),
      advancedSearch: false
    })

    document.getElementById('search-input').focus()
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchContacts({page: pagination.current_page + 1, searchString}))
    }
  }

  _activateAdvancedSearch(e) {
    this.setState({
      advancedSearch: true
    })

    const val = e.target.value
    e.target.value = ''
    e.target.value = val
  }

  render() {
    const { contacts, dispatch, firstContactId, inEdit, fields } = this.props
    const { searchString, advancedSearch } = this.state
    const activeIndex = parseInt(this.context.router.route.match.params.id) || firstContactId

    return (
      <div className={`col list-panel border-right ${inEdit ? 'inEdit' : ''}`}>
        <AdvancedSearch searchFunc={fetchContacts} searchFields={fields} searchString={searchString} />
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {contacts.map(contact => <Contact key={contact.id} contact={contact} dispatch={dispatch} router={this.context.router} activeID={activeIndex} />)}
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

const Contact = ({ contact, dispatch, router, activeID }) => {
  const openContactRecord = (id) => {
    dispatch(fetchContact(contact.id))
    router.history.push(`/contacts/${id}`)
  }

  return (
    <div
      onClick={() => openContactRecord(contact.id)}
      className={`list-group-item list-group-item-action align-items-start ${contact.id === parseInt(activeID) ? ' active' : ''}`}
      >
      <span className="text-muted mini-text float-right">{moment(contact.updated_at).fromNow()}</span>
      <h6>{contact.first_name} {contact.last_name}</h6>
      <p>{contact.company.name}</p>
      <p className="text-muted">{contact.status ? contact.status : 'Untouched'}</p>
    </div>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  activeID: PropTypes.number.isRequired
};

export default connect(state => ({
  searchString: getSearchStringForContacts(state),
  fields: getCustomFieldsForContacts(state)
}))(List)