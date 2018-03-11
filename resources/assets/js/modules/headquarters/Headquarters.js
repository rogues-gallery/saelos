import Model from '../../utils/Model'
import User from '../../modules/user/User'
import Company from '../../modules/companies/Company'
import Contact from '../../modules/contacts/Contact'
import store from '../../store'
import { getCustomFieldsForContacts } from './store/selectors'
import { getCustomFieldValue } from '../../utils/helpers/customFieldsHelper'
import Note from "../notes/Note";
import Opportunity from "../opportunities/Opportunity";

class Headquarters extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    const fields = getCustomFieldsForContacts(store.getState())

    Object.keys(fields).map(key => {
        const field = fields[key]

        if (field.is_custom) {
            this[key] = getCustomFieldValue(field.alias, props.custom_fields, field.default)
        } else {
            this[key] = props[key]   
        }
    })


    // relate user model
    this.user = props.user ? new User(props.user) : new User({})
    this.contact = props.contact ? new Contact(props.contact) : new Contact({})
    this.company = props.company ? new Company(props.company) : new Company({})
    this.notes = props.notes && props.notes.map(n => new Note(n)) || []
    this.opportunities = props.deals && props.deals.map(d => new Opportunity(d)) || []
    this.activities = props.activities || []
  }
}

export default Headquarters
