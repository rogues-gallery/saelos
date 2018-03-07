import Model from '../../utils/Model'
import User from '../../modules/user/User'
import Account from '../../modules/accounts/Account'
import _ from 'lodash'
import store from '../../store'
import { getCustomFieldsForContacts } from './store/selectors'
import { getCustomFieldValue } from '../../utils/helpers/customFieldsHelper'

class Contact extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    const fields = getCustomFieldsForContacts(store.getState())

    Object.keys(fields).map(key => {
        const field = fields[key]

        if (field.isCustom) {
            this[key] = getCustomFieldValue(field.alias, props.customFields, field.default)
        } else {
            this[key] = props[key]   
        }
    })

    // relate user model
    this.user = props.user ? new User(props.user) : new User({})
    this.company = props.company ? new Account(props.company) : new Account({})
    this.notes = props.notes || [];
    this.opportunities = props.deals || [];


  }
}

export default Contact
