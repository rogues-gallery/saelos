import Model from '../../utils/Model'
import Team from '../teams/Team'

class User extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.email = props.email || ''
    this.phone = props.phone || ''

    this.team = props.team && new Team(props.team) || new Team({})
  }
}

export default User