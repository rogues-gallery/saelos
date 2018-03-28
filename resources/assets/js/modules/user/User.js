import Model from '../../utils/Model'
import Team from '../teams/Team'

const jwt_decode = require('jwt-decode')

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
    this.roles = props.roles || []

    this.team = props.team && new Team(props.team) || new Team({})
  }

  authorized(role) {
    // If the role is false (such as with an unguarded menu), then just return true
    if (role === false) {
      return true
    }

    const { scopes } = jwt_decode(localStorage.getItem('access_token'))

    if (!Array.isArray(scopes)) {
      return false
    }

    if (Array.isArray(role)) {
      return role.map(r => scopes && scopes.includes(r)).includes(true)
    }

    return scopes && scopes.includes(role)
  }
}

export default User