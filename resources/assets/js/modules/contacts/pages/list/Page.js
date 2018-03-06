import React from 'react';
import PropTypes from 'prop-types';
import { fetchContacts, fetchContact } from "../../service";

const Page = ({ contacts, dispatch }) => (
  <List contacts={contacts} dispatch={dispatch} />
)

class List extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchContacts())
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
          {this.props.contacts.map(contact => <Contact key={contact.id} contact={contact} dispatch={this.props.dispatch} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const Contact = ({ contact, dispatch }) => {
  return (
    <a href={`/contacts/${contact.id}`} onClick={() => dispatch(fetchContact(contact.id))} className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{`${contact.firstName} ${contact.lastName}`}</h5>
        <small className="text-muted">3 days ago</small>
      </div>
      <p className="mb-1">{contact.position}</p>
      <small className="text-muted">Some Text</small>
    </a>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Page;