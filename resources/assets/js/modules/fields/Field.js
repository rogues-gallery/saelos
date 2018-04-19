import Model from "../../utils/Model";

class Field extends Model {
  constructor(props) {
    super(props);

    this.initialize(props);
  }

  initialize(props) {
    super.initialize(props);

    this.label = props.label ? props.label : "";
    this.alias = props.alias ? props.alias : "";
    this.model = props.model ? props.model : "";
    this.group = props.group ? props.group : "";
    this.type = props.type ? props.type : "";
    this.entity_class = props.entity_class ? props.entity_class : "";
    this.default = props.default ? props.default : "";
    this.values = props.values ? props.values : [];
    this.required = props.required ? props.required : false;
    this.protected = props.protected ? props.protected : false;
    this.hidden = props.hidden ? props.hidden : false;
    this.summary = props.summary ? props.summary : "";
    this.ordering = props.ordering ? props.ordering : 0;
    this.searchable = props.searchable ? props.searchable : false;
  }
}

export default Field;
