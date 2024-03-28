import axios from "./axios-customized";

export const call_get_image = (id) => {
  return axios.get(`/api/v1/image/${id}`);
};

export const call_get_all_phanqua = (id) =>{
  return axios.get(`/api/v1/phan-qua/${id}`)
}

export const call_post_baocao =(name, phone, qua, id_game)=>{
  return axios.post("/api/v1/bao-cao", {name, phone, qua, id_game})
}