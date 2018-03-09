import React from 'react'
import PropTypes from 'prop-types'
import { fetchContacts, fetchContact } from '../../../service'
import moment from 'moment'
import ReactDOM from 'react-dom'

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentWillMount() {
    const { contacts, dispatch, searchString } = this.props

    if (contacts.length === 0) {
      dispatch(fetchContacts({page: 1, searchString}))
    }
  }

  // componentDidMount() {
  //   const el = ReactDOM.findDOMNode(this).querySelector('.list-group-item.active');

  //   if (el) {
  //     el.scrollIntoView(false)
  //   }
  // }

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
      dispatch(fetchContacts({page: 1, searchString: ''}))
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

  render() {
    const { contacts, dispatch, searchString, firstContactId } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || firstContactId

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
                onKeyPress={this._onKeyPress}
                defaultValue={searchString}
              />
            </form>
            <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Active</b></div> <div className="text-muted col"><b>All</b></div></div>
          </div>
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
  searchString: PropTypes.string
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
      <p className="text-muted">{contact.status}</p>
    </div>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  activeID: PropTypes.number.isRequired
};

export default List