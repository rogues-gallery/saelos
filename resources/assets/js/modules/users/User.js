import Model from '../../utils/Model'
import Team from '../teams/Team'
import Role from '../roles/Role'

const jwt_decode = require('jwt-decode')

class User extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    // @TODO: Attach custom fields to top level as in Contact, Company, etc. Currently an issue with rendering / speed.
    super.initialize(props)

    this.name = props.name || ''
    this.email = props.email || ''
    this.phone = props.phone || ''
    this.roles = props.roles && props.roles.map(r => new Role(r)) || []
    this.custom_fields = props.custom_fields || []

    this.team = props.team && new Team(props.team) || new Team({})
    this.views = [
      {
        searchString: 'first_name:"Don"',
        linkText: 'First Name: Don',
        color: '#565656'
      },
      {
        searchString: 'first_name:"David"',
        linkText: 'First Name: David',
        color: '#656565'
      }
    ]
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