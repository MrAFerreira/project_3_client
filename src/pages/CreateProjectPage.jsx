import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProjectsAPIService from "../services/projects.api";

const projectsService = new ProjectsAPIService();

function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async e => {
    // <== ADD
    e.preventDefault();

    const requestBody = { title, description };
    try {
      await projectsService.createProject(requestBody);
      navigate("/projectds");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="CreateProjectPage">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;
