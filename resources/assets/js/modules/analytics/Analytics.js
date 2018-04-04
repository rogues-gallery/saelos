import Model from '../../utils/Model'
import User from '../users/User'

class Analytics extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''

    // relate user model
    this.user = props.user ? new User(props.user) : new User({})
  }
}

export default Analytics