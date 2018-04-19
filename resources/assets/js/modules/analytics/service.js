import Http from "../../utils/Http";
import * as actions from "./store/actions";
import store from "../../store";

export const fetchActivityGraph = params => dispatch => {
  return Http.get("activities/graph", { params })
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const fetchPipelineGraph = params => dispatch => {
  return Http.get(`stages/pipeline`, { params })
    .then(res => res.data)
    .catch(err => console.log(err));
};
