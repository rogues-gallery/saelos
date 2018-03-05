import Model from '../../utils/Model'

class Workflow extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.published = props.published || 0
    this.name = props.name || ''
    this.entityType = props.entityType || ''
    this.processAt = props.processAt || ''
    this.fieldAlias = props.fieldAlias || ''
    this.operator = props.operator || ''
    this.checkValue = props.checkValue || ''
    this.actions = props.actions || {}
  }
}

export default Workflow
