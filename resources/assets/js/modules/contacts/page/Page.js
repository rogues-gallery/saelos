import React from 'react';
import PropTypes from 'prop-types';
import { fetchContacts, fetchContact } from "../service";
import Record from './panels/record';

const Page = ({ contacts, dispatch }) => ([
    <List contacts={contacts} dispatch={dispatch} key={0} />,
    <Record key={1} dispatch={dispatch} />
])

class List extends React.Component {
  componentWillMount() {
    if (this.props.contacts.length === 0) {
      this.props.dispatch(fetchContacts()) 
    }
  }

  render() {
    return (
      <div className="container col-sm-2 col-md-3 list-panel offset-md-2">
        <div className="position-fixed">
          <form>
            <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{position:"relative", verticalAlign:"top"}} />
          </form>
        </div>
        <div className="list-group">
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
    <div onClick={() => openContactRecord(contact.id)} className={`list-group-item list-group-item-action flex-column align-items-start ${contact.id === parseInt(router.route.match.params.id) ? ' active' : ''}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{`${contact.firstName} ${contact.lastName}`}</h5>
        <small className="text-muted">3 days ago</small>
      </div>
      <p className="mb-1">{contact.position}</p>
      <small className="text-muted">Some Text</small>
    </div>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Page;