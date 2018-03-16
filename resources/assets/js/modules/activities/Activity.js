import Model from '../../utils/Model'
import moment from 'moment'
import User from "../user/User";
import Contact from "../contacts/Contact"
import Company from "../companies/Company"
import Opportunity from "../opportunities/Opportunity"

class Activity extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.details = props.details ? props.details : {}
    this.title = props.title || ''
    this.description = props.description || ''
    this.completed = props.completed ? props.completed : 0
    this.due_date = props.due_date ? props.due_date : null
    this.fulfillment_date = props.fulfillment_date ? props.fulfillment_date : null
    this.user = props.user && new User(props.user) || new User({})
    this.details = props.details ? props.details : {}
    this.details_type = props.details_type ? props.details_type : ''

    //@TODO: Don, I moved your really bad code from the App/Http/Resources/Activity here instead. It's still bad.
    this.company = props.company && props.company.length ? new Company(props.company[0]) : new Company({})
    this.contact = props.person && props.person.length ? new Contact(props.person[0]) : new Contact({})
    this.opportunity = props.company && props.deal.length  ? new Opportunity(props.deal[0]) : new Opportunity({})
  }
}

export default Activity
