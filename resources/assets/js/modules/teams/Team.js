import Model from '../../utils/Model'
import User from '../../modules/user/User'

class Team extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.description = props.description || ''

    // relate user model
    this.leader = props.user && new User(props.leader) || {}
    this.users = props.users && props.users.map(u => new User(u)) || [] 
  }
}

export default Team
