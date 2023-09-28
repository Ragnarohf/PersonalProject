import Axios from "./caller.service";
import axios from "axios";

let getAllUser = () => {
  return Axios.get("/users");
};
let getUser = (uid) => {
  return axios.get("/users/" + uid);
};

export const userService = {
  getAllUser,
  getUser,
};
