import Styles from './Styles/Styles';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Projects from './pages/Projects';
import RoomPlans from './pages/RoomPlans';
import Planner from './pages/Planner';
import ResponseDialog from './components/responseDialog/ResponseDialog';
import { useCallback, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [success, setSucccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("")
  const [detail, setDetail] = useState<string>("")

  const navigate = useNavigate();

  function handleGetProjects(success: boolean): void {
    if (!success) {
      setOpen(true);
      setSucccess(false);
      setTitle("Get projects failed");
      setDetail("Some error has ocrured while get project datas.");
    }
    else {
      setOpen(false);
      setSucccess(true);
      setTitle("");
      setDetail("");
    }
  }

  function handleGetProjectbyId(success: boolean): void {
    if (!success) {
      setOpen(true);
      setSucccess(false);
      setTitle("Get project failed");
      setDetail("Some error has ocrured while get project data.");
    }
    else {
      setOpen(false);
      setSucccess(true);
      setTitle("");
      setDetail("");
    }
  }

  function handleGetRoomPlans(success: boolean): void {
    if (!success) {
      setOpen(true);
      setSucccess(false);
      setTitle("Get room plans failed");
      setDetail("Some error has ocrured while get room plan datas.");
    }
    else {
      setOpen(false);
      setSucccess(true);
      setTitle("");
      setDetail("");
    }
  }

  function handleClose(): void {
    setOpen(false);
    navigate("/signin");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  }

  const fetchData = useCallback(async (pathname: string) => {
    const projectId = pathname.slice(10, 30);
    const roomPlanId = pathname.slice(42, 62);
    if (localStorage.accessToken) {
      if (Boolean(projectId) && Boolean(roomPlanId)) {
        getAnchors(projectId, roomPlanId, setAnchors);
        getProjectbyId(projectId, setCurrentProject, handleGetProjectbyId);
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
        getRoomPlans(projectId, setRoomPlans, handleGetRoomPlans);
        getProjectbyId(projectId, setCurrentProject, handleGetProjectbyId);
      }
      else {
        if (pathname === "/projects") {
          setCurrentProject({
            id: "",
            name: ""
          });
          setRoomPlans([]);
          getProjects(setProjects, handleGetProjects);
        }
      }
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
          path="/signin"
          element={
            <SignIn />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp />
          }
        />
        <Route
          path="/projects"
          element={localStorage.accessToken ?
            <Projects
              isLoading={isLoading}
              projects={projects}
              currentProject={currentProject}
              setProjects={setProjects}
              setCurrentProject={setCurrentProject}
            />
            :
            <Navigate to="/signin" />
          }
        />
        <Route
          path="/projects/:projectId/room-plans"
          element={localStorage.accessToken ?
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
            :
            <Navigate to="/signin" />
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
      <ResponseDialog
        open={open}
        success={success}
        title={title}
        detail={detail}
        handleClose={handleClose}
      />
    </Styles>
  );
}

export default App;
