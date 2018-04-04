import Model from '../../utils/Model'
import Opportunity from '../opportunities/Opportunity'
import Company from '../companies/Company'
import Contact from '../contacts/Contact'
import Activity from '../activities/Activity'

class Tag extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.color = props.color || ''
    this.opportunities = props.opportunities && props.opportunities.map(o => new Opportunity(o)) || []
    this.companies = props.companies && props.companies.map(c => new Company(c)) || []
    this.contacts = props.contacts && props.contacts.map(c => new Contact(c)) || []
    this.activities = props.activities && props.activities.map(a => new Activity(a)) || []
  }
}

export default Tag
