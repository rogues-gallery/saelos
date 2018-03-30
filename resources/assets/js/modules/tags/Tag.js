import Model from '../../utils/Model'

class Tag extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.color = props.color || 0

  }
}

export default Tag