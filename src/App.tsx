import {
  Routes,
  Route,
} from "react-router-dom";
import Projects from './pages/Projects';
import Planner from './pages/Planner';
import Realtime from './pages/Realtime';
import History from './pages/History';
import axios from "./axios";
import { useEffect, useState } from "react";
import { Project } from "./types";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios
      .get(`/projects`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Projects projects={projects} setProjects={setProjects}/>}
      />
      <Route
        path="/:projectId/planner"
        element={<Planner projects={projects} setProjects={setProjects}/>}
      />
      <Route
        path="/:projectId/realtime"
        element={<Realtime projects={projects} setProjects={setProjects}/>}
      />
      <Route
        path="/:projectId/history"
        element={<History projects={projects} setProjects={setProjects}/>}
      />
    </Routes>
  );
}

export default App;
