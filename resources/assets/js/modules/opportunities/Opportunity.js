import Model from '../../utils/Model'
import User from '../../modules/user/User'
import Account from '../../modules/accounts/Account'
import store from '../../store'
import { getCustomFieldsForOpportunities } from './store/selectors'
import { getCustomFieldValue } from '../../utils/helpers/customFieldsHelper'


class Opportunity extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

       const fields = getCustomFieldsForOpportunities(store.getState())

    Object.keys(fields).map(key => {
        const field = fields[key]

        if (field.is_custom) {
            this[key] = getCustomFieldValue(field.alias, props.custom_fields, field.default)
        } else {
            this[key] = props[key]   
        }
    })

    // relate user model
    this.user = props.user ? new User(props.user) : new User({})
    this.company = props.company ? new Account(props.company) : new Account({})
    this.contacts = props.people || []
    this.notes = props.notes || []
  }
}

export default Opportunity
