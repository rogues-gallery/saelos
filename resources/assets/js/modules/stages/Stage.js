import Model from '../../utils/Model'

class Stage extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.probability = props.probability || ''
    this.active = props.active || 0

  }
}

export default Stage