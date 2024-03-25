import axios from "./axios-customized";

export const call_get_image = (id) => {
  return axios.get(`/api/v1/image/${id}`);
};
