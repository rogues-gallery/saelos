import Model from "../../utils/Model";
import User from "../users/User";
import Contact from "../contacts/Contact";
import store from "../../store";
import Opportunity from "../opportunities/Opportunity";
import Note from "../notes/Note";
import { getCustomFieldsForCompanies } from "./store/selectors";
import { getCustomFieldValue } from "../../utils/helpers/customFieldsHelper";
import moment from "moment";
import Tag from "../tags/Tag";

class Company extends Model {
  constructor(props) {
    super(props);

    this.initialize(props);
  }

  initialize(props = {}) {
    props.custom_fields = props.custom_fields ? props.custom_fields : [];

    super.initialize(Object.assign({}, props));

    const fields = getCustomFieldsForCompanies(store.getState());

    fields.map(field => {
      if (field.is_custom) {
        const value = getCustomFieldValue(
          field.alias,
          props.custom_fields,
          field.default
        );

        this[field.alias] = field.type === "date" ? moment(value) : value;
      } else {
        if (!props.hasOwnProperty(field.alias)) {
          props[field.alias] = null;
        }

        this[field.alias] = props[field.alias];
      }
    });

    this.primary = (props.pivot && props.pivot.primary) || 0;
    this.position = (props.pivot && props.pivot.position) || "";

    // relate user model
    this.user = props.user ? new User(props.user) : new User({});
    this.contacts =
      (props.contacts && props.contacts.map(c => new Contact(c))) || [];
    this.notes = (props.notes && props.notes.map(n => new Note(n))) || [];
    this.opportunities =
      (props.opportunities &&
        props.opportunities.map(d => new Opportunity(d))) ||
      [];
    this.activities = props.activities || [];
    this.tags = (props.tags && props.tags.map(t => new Tag(t))) || [];
  }
}

export default Company;
