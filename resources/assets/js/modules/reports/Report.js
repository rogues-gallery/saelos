import Model from '../../utils/Model'
import User from '../../modules/user/User'

class Report extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.columns = props.columns || []
    this.description = props.description || ''
    this.dataSource = props.dataSource || ''
    this.filters = props.filters || {}

    // relate user model
    this.user = props.user ? new User(props.user) : null
  }
}

export default Report
