import Model from '../../utils/Model'
import moment from 'moment'
import User from "../user/User";

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
    this.due_date = props.due_date ? moment(props.due_date) : null
    this.fulfillment_date = props.fulfillment_date ? moment(props.fulfillment_date) : null
    this.user = props.user && new User(props.user) || new User({})
  }
}

export default Activity
