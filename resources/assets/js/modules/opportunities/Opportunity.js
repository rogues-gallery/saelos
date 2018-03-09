import Model from '../../utils/Model'
import User from '../user/User'
import Contact from '../contacts/Contact'
import Company from '../companies/Company'
import store from '../../store'
import Note from "../notes/Note";
import { getCustomFieldsForOpportunities } from './store/selectors'
import { getCustomFieldValue } from '../../utils/helpers/customFieldsHelper'


class Opportunity extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    const fields = getCustomFieldsForOpportunities(store.getState())

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
    this.company = props.company ? new Company(props.company) : new Company({})
    this.contacts = props.people && props.people.map(c => new Contact(c)) || []
    this.notes = props.notes && props.notes.map(n => new Note(n)) || []
  }
}

export default Opportunity
