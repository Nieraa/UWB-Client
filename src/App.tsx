import Projects from './pages/Projects';
import Planner from './pages/Planner';
import Realtime from './pages/Realtime';
import History from './pages/History';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "./services/ProjectsService";
import { Project } from "./types";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects(setProjects);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" />}>
      </Route>
      <Route
          path="/projects"
          element={<Projects projects={projects} setProjects={setProjects} />}
        />
      <Route
        path="/projects/:projectId/planner"
        element={<Planner projects={projects} setProjects={setProjects} />}
      />
      <Route
        path="/projects/:projectId/realtime"
        element={<Realtime projects={projects} setProjects={setProjects} />}
      />
      <Route
        path="/projects/:projectId/history"
        element={<History projects={projects} setProjects={setProjects} />}
      />
    </Routes>
  );
}

export default App;
