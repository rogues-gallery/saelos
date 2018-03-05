import Model from '../../utils/Model'
import User from '../../modules/user/User'

class Account extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.published = props.published || 0
    this.description = props.description || ''
    this.address1 = props.address1 || ''
    this.address2 = props.address2 || ''
    this.city = props.city || ''
    this.state = props.state || ''
    this.zip = props.zip || ''
    this.country = props.country || ''
    this.phone = props.phone || ''
    this.fax = props.fax || ''
    this.website = props.website || ''
    this.info = props.info || ''

    // relate user model
    this.user = props.user ? new User(props.user) : null
  }
}

export default Account
