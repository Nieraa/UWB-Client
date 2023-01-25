import Projects from './pages/Projects';
import Planner from './pages/Planner';
import Realtime from './pages/Realtime';
import History from './pages/History';
import {
  Routes,
  Route,
  Navigate,
  Params,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Node, Project, RoomPlan } from "./types";
import { getProjectbyId, getProjects } from "./services/ProjectsService";
import RoomPlans from './pages/RoomPlans';
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

  const [params, setParams] = useState<Readonly<Params<string>>>({});

  useEffect(() => {
    if (params.projectId && params.roomPlanId) {
      getAnchors(params.projectId, params.roomPlanId, setAnchors);
      getProjectbyId(params.projectId, setCurrentProject);
      getRoomPlanbyId(params.projectId, params.roomPlanId, setCurrentRoomPlan);
    }
    else if (params.projectId) {
      getRoomPlans(params.projectId, setRoomPlans);
      getProjectbyId(params.projectId, setCurrentProject);
      setCurrentRoomPlan({
        id: "",
        name: "",
        image: "",
        xRatio: 0,
        yRatio: 0,
        xOrigin: 0,
        yOrigin: 0
      });
    }
    else {
      getProjects(setProjects);
      setCurrentProject({ 
        id: "", 
        name: "" 
      });
    }
  }, [params.projectId, params.roomPlanId]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" />}>
      </Route>
      <Route
        path="/projects"
        element={
          <Projects
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
            projectId={currentProject.id}
            projects={projects}
            roomPlans={roomPlans}
            currentProject={currentProject}
            currentRoomPlan={currentRoomPlan}
            setRoomPlans={setRoomPlans}
            setCurrentRoomPlan={setCurrentRoomPlan}
            setParams={setParams}
          />
        }
      />
      <Route
        path="/projects/:projectId/room-plans/:roomPlanId/planner"
        element={
          <Planner
            projectId={currentProject.id}
            roomPlanId={currentRoomPlan.id}
            projects={projects}
            anchors={anchors}
            currentProject={currentProject}
            currentRoomPlan={currentRoomPlan}
            currentAnchor={currentAnchor}
            setAnchors={setAnchors}
            setCurrentAnchor={setCurrentAnchor}
            setParams={setParams}
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
  );
}

export default App;
