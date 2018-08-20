import Model from "../../utils/Model";

class Import extends Model {
  constructor(props) {
    super(props);

    this.initialize(props);
  }

  initialize(props) {
    super.initialize(props);

    this.name = props.name || "";
    this.rows = props.rows || 0;
    this.entity_type = props.entity_type || "";
  }
}

export default Import;
