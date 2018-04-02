import Model from '../../utils/Model'
import User from '../user/User'
import Contact from '../contacts/Contact'
import Company from '../companies/Company'
import Stage from '../stages/Stage'
import store from '../../store'
import Note from "../notes/Note";
import { getCustomFieldsForOpportunities } from './store/selectors'
import { getCustomFieldValue } from '../../utils/helpers/customFieldsHelper'
import moment from "moment"
import Tag from "../tags/Tag";


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
          const value = getCustomFieldValue(field.alias, props.custom_fields, field.default)

          this[key] = field.type === 'date' ? moment(value) : value
        } else {
            this[key] = props[key]   
        }
    })

    this.primary = props.pivot && props.pivot.primary || 0
    this.role = props.pivot && props.pivot.position || ''

    // relate user model
    this.user = props.user ? new User(props.user) : new User({})
    this.companies = props.companies && props.companies.map(c => new Company(c)) || []
    this.stage = props.stage ? new Stage(props.stage) : new Stage({})
    this.contacts = props.contacts && props.contacts.map(c => new Contact(c)) || []
    this.notes = props.notes && props.notes.map(n => new Note(n)) || []
    this.activities = props.activities || []
    this.pivot = props.pivot ? props.pivot : {}
    this.tags = props.tags && props.tags.map(t => new Tag(t)) || []


    const primaryCompany = _.find(this.companies, c => c.primary === 1)

    this.company = typeof primaryCompany === 'undefined' ? new Company({}) : primaryCompany
  }
}

export default Opportunity
