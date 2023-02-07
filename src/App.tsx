import Styles from './Styles/Styles';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import RoomPlans from './pages/RoomPlans';
import Planner from './pages/Planner';
import { useCallback, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Node, Project, RoomPlan } from "./types";
import { getProjectbyId, getProjects } from "./services/ProjectsService";
import { getRoomPlanbyId, getRoomPlans } from './services/RoomPlansService';
import { getAnchors } from './services/AnchorsService';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>({
    id: "",
    name: ""
  });
  const [roomPlans, setRoomPlans] = useState<RoomPlan[]>([]);
  const [currentRoomPlan, setCurrentRoomPlan] = useState<RoomPlan>({
    id: "",
    name: "",
    image: "",
    xRatio: 0,
    yRatio: 0,
    xOrigin: 0,
    yOrigin: 0
  });
  const [anchors, setAnchors] = useState<Node[]>([]);
  const [currentAnchor, setCurrentAnchor] = useState<Node>({
    id: "",
    name: "",
    x: 0,
    y: 0,
    z: 0
  });

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async (pathname: string) => {
    const projectId = pathname.slice(10, 30);
    const roomPlanId = pathname.slice(42, 62);
    if (Boolean(projectId) && Boolean(roomPlanId)) {
      getAnchors(projectId, roomPlanId, setAnchors);
      getProjectbyId(projectId, setCurrentProject);
      getRoomPlanbyId(projectId, roomPlanId, setCurrentRoomPlan);
    }
    else if (Boolean(projectId)) {
      setCurrentRoomPlan({
        id: "",
        name: "",
        image: "",
        xRatio: 0,
        yRatio: 0,
        xOrigin: 0,
        yOrigin: 0
      });
      setAnchors([]);
      getRoomPlans(projectId, setRoomPlans);
      getProjectbyId(projectId, setCurrentProject);
    }
    else {
      setCurrentProject({
        id: "",
        name: ""
      });
      setRoomPlans([]);
      getProjects(setProjects);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchData(location.pathname).then(() => setIsLoading(false));
  }, [fetchData, location]);

  return (
    <Styles>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" />}>
        </Route>
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/register"
          element={
            <Register />
          }
        />
        <Route
          path="/projects"
          element={
            <Projects
              isLoading={isLoading}
              projects={projects}
              currentProject={currentProject}
              setProjects={setProjects}
              setCurrentProject={setCurrentProject}
            />
          }
        />
        <Route
          path="/projects/:projectId/room-plans"
          element={
            <RoomPlans
              isLoading={isLoading}
              projectId={currentProject.id}
              projects={projects}
              roomPlans={roomPlans}
              currentProject={currentProject}
              currentRoomPlan={currentRoomPlan}
              setRoomPlans={setRoomPlans}
              setCurrentRoomPlan={setCurrentRoomPlan}
            />
          }
        />
        <Route
          path="/projects/:projectId/room-plans/:roomPlanId/planner"
          element={
            <Planner
              isLoading={isLoading}
              projectId={currentProject.id}
              roomPlanId={currentRoomPlan.id}
              projects={projects}
              anchors={anchors}
              currentProject={currentProject}
              currentRoomPlan={currentRoomPlan}
              currentAnchor={currentAnchor}
              setAnchors={setAnchors}
              setCurrentAnchor={setCurrentAnchor}
            />
          }
        />
        {/* <Route
        path="/projects/:projectId/realtime"
        element={<Realtime projects={projects} setProjects={setProjects} />}
      />
      <Route
        path="/projects/:projectId/history"
        element={<History projects={projects} setProjects={setProjects} />}
      /> */}
      </Routes>
    </Styles>
  );
}

export default App;
