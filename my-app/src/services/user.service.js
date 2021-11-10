import http from "../http-common";

class UserDataService{
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }
}

export default new UserDataService