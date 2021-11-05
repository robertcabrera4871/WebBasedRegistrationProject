import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/tutorials");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }
}

export default new UserDataService