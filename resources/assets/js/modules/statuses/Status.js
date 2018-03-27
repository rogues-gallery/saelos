import Model from '../../utils/Model'

class Status extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || 'Untouched'
    this.color = props.color || ''
  }
}

export default Status