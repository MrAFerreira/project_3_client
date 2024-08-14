import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Private from "./components/Private";
import Anon from "./components/Anon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/projects"
          element={
            <Private>
              <ProjectListPage />
            </Private>
          }
        />
        <Route
          exact
          path="/projects/create"
          element={<CreateProjectPage />}
        />
        <Route
          path="/projects/:projectId"
          element={<ProjectDetailsPage />}
        />
        <Route
          path="/projects/edit/:projectId"
          element={<EditProjectPage />}
        />
        <Route
          path="/signup"
          element={
            <Anon>
              <Signup />
            </Anon>
          }
        />
        <Route
          path="/login"
          element={
            <Anon>
              <Login />
            </Anon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
