import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import AdvancedSearch from "../../../../../common/search";
import { fetchContact, fetchContacts } from "../../../service";
import {
  getSearchStringForContacts,
  getCustomFieldsForContacts,
  getContacts,
  getPaginationForContacts
} from "../../../store/selectors";
import { getActiveUser } from "../../../../users/store/selectors";
import { isInEdit } from "../../../../contacts/store/selectors";
import Contact from "../../../Contact";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeID: props.contact.id
    };
  }

  componentDidMount() {
    const { contacts, dispatch, searchString } = this.props;

    if (contacts.length === 0) {
      dispatch(fetchContacts({ page: 1, searchString }));
    }
  }

  _onScroll = event => {
    const { target } = event;
    const { dispatch, pagination, searchString } = this.props;
    const currentPosition = target.scrollTop + target.offsetHeight;

    if (currentPosition + 300 >= target.scrollHeight) {
      dispatch(
        fetchContacts({ page: pagination.current_page + 1, searchString })
      );
    }
  };

  _openRecord = id => {
    this.setState({
      activeID: id
    });

    this.context.router.history.push(`/contacts/${id}`);
  };

  render() {
    const { contacts, inEdit, fields, searchString, user } = this.props;
    const { activeID } = this.state;

    return (
      <div className={`col list-panel border-right ${inEdit ? "inEdit" : ""}`}>
        <AdvancedSearch
          searchFunc={fetchContacts}
          searchFields={fields}
          searchString={searchString}
          parentItem="contacts"
        />
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {contacts.map(c => (
            <div
              key={c.id}
              onClick={() => this._openRecord(c.id)}
              className={`list-group-item list-group-item-action align-items-start ${
                c.id === activeID ? "active" : ""
              } ${c.user.id === user.id ? "corner-flag" : ""}`}
            >
              <span className="text-muted mini-text float-right">
                {moment(c.updated_at).fromNow()}
              </span>
              <h6>
                {c.first_name} {c.last_name}
              </h6>
              <p>{c.company.name}</p>
              <p className="text-muted">{c.status.name}</p>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="d-flex align-items-center h-100 text-center">
              <h5 className="text-muted w-100">No results for this search.</h5>
            </div>
          )}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  contact: PropTypes.instanceOf(Contact).isRequired
};

List.contextTypes = {
  router: PropTypes.object
};

export default connect(state => ({
  searchString: getSearchStringForContacts(state),
  fields: getCustomFieldsForContacts(state),
  contacts: getContacts(state),
  inEdit: isInEdit(state),
  user: getActiveUser(state),
  pagination: getPaginationForContacts(state)
}))(List);
