import Model from '../../utils/Model'
import User from '../../modules/user/User'
import Account from '../../modules/accounts/Account'
import _ from 'lodash';

class Contact extends Model {
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
    this.company_id = props.company_id || 0;

    // relate user model
    this.user = props.user ? new User(props.user) : null
    this.company = props.company ? new Account(props.company) : new Account({})
  }
}

export default Contact
