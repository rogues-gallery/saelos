import Model from '../../utils/Model'
import User from '../../modules/user/User'

class Workflow extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.published = props.published || 0
    this.firstName = props.firstName || ''
    this.lastName = props.lastName || ''
    this.position = props.position || ''
    this.email = props.email || ''
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

export default Workflow
