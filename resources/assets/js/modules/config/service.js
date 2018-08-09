import Http from "../../utils/Http";

export const saveSetting = params => {
  Http.post(`settings`, params);
};
