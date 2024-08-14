import axios from "axios";

class ProjectsAPIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
    this.authToken = localStorage.getItem("authToken");
  }

  getAllProjects() {
    return axios.get(`${this.baseURL}/api/projects`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }

  createProject(project) {
    return axios.post(`${this.baseURL}/api/projects`, project, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }
}

export default ProjectsAPIService;
