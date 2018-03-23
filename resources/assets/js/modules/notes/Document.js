import Model from '../../utils/Model'

class Document extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.filename = props.filename || ''
    this.mimetype = props.mimetype || ''
    this.size = props.size || 0
  }
}

export default Document
