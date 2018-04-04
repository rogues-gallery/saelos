import Model from '../../utils/Model'
import moment from 'moment'
import User from '../users/User'
import Contact from '../contacts/Contact'
import Company from '../companies/Company'
import Opportunity from '../opportunities/Opportunity'
import Tag from '../tags/Tag'

class Activity extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.details = props.details ? props.details : {}
    this.name = props.name || ''
    this.description = props.description || ''
    this.completed = props.completed ? props.completed : 0
    this.due_date = props.due_date ? moment(props.due_date) : moment()
    this.fulfillment_date = props.fulfillment_date ? moment(props.fulfillment_date) : moment()
    this.user = props.user && new User(props.user) || new User({})
    this.details = props.details ? props.details : {}
    this.details_type = props.details_type ? props.details_type : ''

    //@TODO: Don, I moved your really bad code from the App/Http/Resources/Activity here instead. It's still bad.
    this.company = props.company && props.company.length ? new Company(props.company[0]) : new Company({})
    this.contact = props.contact && props.contact.length ? new Contact(props.contact[0]) : new Contact({})
    this.opportunity = props.company && props.opportunity.length  ? new Opportunity(props.opportunity[0]) : new Opportunity({})
    this.tags = props.tags && props.tags.map(t => new Tag(t)) || []
  }
}

export default Activity
