import Model from '../../utils/Model'
import User from '../../modules/user/User'

class Leader extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.title = props.title || ''
    this.description = props.description || ''

    // relate user model
    this.leader = props.user ? new User(props.leader) : null
  }
}

export default Leader
