import React from 'react';
import PropTypes from 'prop-types';
import { fetchContacts, fetchContact } from "../../../service";


class List extends React.Component {
  componentWillMount() {
    if (this.props.contacts.length === 0) {
      this.props.dispatch(fetchContacts()) 
    }
  }

  render() {
    return (
      <div className="container col-sm-2 col-md-3 list-panel offset-md-2 border-right">
          <div className="px-4 pt-4 bg-white border-bottom">
            <form>
              <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{position:"relative", verticalAlign:"top"}} />
            </form>
            <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Active</b></div> <div className="text-muted col"><b>All</b></div></div>
          </div>
        <div className="list-group h-scroll">
          {this.props.contacts.map(contact => <Contact key={contact.id} contact={contact} dispatch={this.props.dispatch} router={this.context.router} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
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
      <h6>{contact.firstName} {contact.lastName}</h6>
      <p>Company Name</p>
      <p className="text-muted">Contact Status</p>
    </div>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default List