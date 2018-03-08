import React from 'react'
import PropTypes from 'prop-types'
import { fetchContacts, fetchContact } from '../../../service'
import moment from 'moment'

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
  }

  componentWillMount() {
    const { contacts, dispatch } = this.props

    if (contacts.length === 0) {
      dispatch(fetchContacts())
    }
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination } = this.props

    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      dispatch(fetchContacts({page: pagination.current_page + 1}))
    }
  }

  render() {
    const { contacts, dispatch } = this.props

    return (
      <div className="col list-panel border-right">
          <div className="px-4 pt-4 bg-white border-bottom">
            <form>
              <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{position:"relative", verticalAlign:"top"}} />
            </form>
            <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Active</b></div> <div className="text-muted col"><b>All</b></div></div>
          </div>
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {contacts.map(contact => <Contact key={contact.id} contact={contact} dispatch={dispatch} router={this.context.router} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired
};

List.contextTypes = {
  router: PropTypes.object
}

const Contact = ({ contact, dispatch, router }) => {
  const openContactRecord = (id) => {
    dispatch(fetchContact(contact.id))
    router.history.push(`/contacts/${id}`)
  }

  return (
    <div onClick={() => openContactRecord(contact.id)} className={`list-group-item list-group-item-action align-items-start ${contact.id === parseInt(router.route.match.params.id) ? ' active' : ''}`}>
      <span className="text-muted mini-text float-right">{moment(contact.updated_at).fromNow()}</span>
      <h6>{contact.first_name} {contact.last_name}</h6>
      <p>Company Name</p>
      <p className="text-muted">Status</p>
    </div>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default List