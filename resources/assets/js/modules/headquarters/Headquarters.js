import Model from '../../utils/Model'
import User from '../../modules/user/User'
import store from '../../store'

class Headquarters extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    // relate user model
    this.user = props.user ? new User(props.user) : new User({})
  }
}

export default Headquarters
