import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import ProjectsAPIService from "../services/projects.api";

const projectsService = new ProjectsAPIService();

function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  // Abstraction
  // Polymorphism
  // Inheritance

  /*  const getAllProjects = () => {
    axios
      .get(
        `https://project-management-api-4641927fee65.herokuapp.com/projects?_embed=tasks`
      )
      .then(response => setProjects(response.data))
      .catch(error => console.log(error));
  }; */

  const fetchData = async () => {
    try {
      const response = await projectsService.getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ProjectListPage">
      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>

      {projects.map(project => (
        <ProjectCard
          key={project.id}
          {...project}
        />
      ))}
    </div>
  );
}

export default ProjectListPage;
