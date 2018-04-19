import Model from "../../utils/Model";

class Role extends Model {
  constructor(props) {
    super(props);

    this.initialize(props);
  }

  initialize(props) {
    super.initialize(props);

    this.name = props.name || "";
    this.description = props.description || "";
  }
}

export default Role;
