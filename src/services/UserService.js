import axios from "./axios";

const fetchAllUser = (page) => {
  return axios.get(`api/users?page=${page}`);
};

const postCreateUser = (data) => {
  return axios.post("api/users", { data });
};

const putUpdateUser = (id, data) => {
  return axios.put(`api/users/${id}`, { data });
};

const deleteUser = (id) => {
  return axios.delete(`api/users/${id}`);
};

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser };
