import Model from "../../utils/Model";

const initialShape = {
  name: "",
  probability: "",
  active: "",
  color: ""
};

class Stage extends Model {
  constructor(props) {
    super(props);

    this.initialize(props);
  }

  initialize(props) {
    super.initialize(props);

    this.name = props.name || "";
    this.probability = props.probability || "";
    this.color = props.color || "";
    this.active = props.active || 0;
  }

  static create() {
    return new Stage(initialShape);
  }
}

export default Stage;
