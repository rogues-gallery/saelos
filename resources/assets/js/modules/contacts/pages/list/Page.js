import React from 'react';
import PropTypes from 'prop-types';
import { fetchContacts, fetchContact } from "../../service";

class Page extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchContacts())
    }

    render() {
        return (
            <div className="container">
                {this.props.contacts.map(contact => <Contact key={contact.id} contact={contact} dispatch={this.props.dispatch} />)}
            </div>
        )
    }
}

Page.propTypes = {
    contacts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

const Contact = ({ contact, dispatch }) => {
    return (
        <div className="contact" onClick={() => dispatch(fetchContact(contact.id))}>
            {`${contact.firstName} ${contact.lastName}`}
        </div>
    );
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired
};

export default Page;