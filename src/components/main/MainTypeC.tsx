import {
  MainArea,
  BreadcrumbsArea,
  AddElementButton,
  BreadcrumbLink,
  BreadcrumbText
} from "./Main.style";
import Canvas from "../canvas/Canvas";
import { Breadcrumbs, Skeleton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Node, Project, RoomPlan } from "../../types";

interface MainTypeCProps {
  isLoading: boolean;
  projectId: string;
  roomPlanId: string;
  anchors: Node[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  setOpenCreate: (openCreate: boolean) => void;
}

function MainTypeC(props: MainTypeCProps) {
  const {
    isLoading,
    projectId,
    roomPlanId,
    anchors,
    currentProject,
    currentRoomPlan,
    setOpenCreate
  } = props;

  function handleClickOpen(): void {
    setOpenCreate(true);
  }

  return (
    <MainArea>
      <BreadcrumbsArea>
        <Breadcrumbs aria-label="breadcrumb">
          <Tooltip title="Projects">
            <BreadcrumbLink to="/projects">
              Projects
            </BreadcrumbLink>
          </Tooltip>
          <Tooltip title={currentProject.name}>
            <BreadcrumbLink to={`/projects/${currentProject.id}/room-plans`}>
              {currentProject.name.length > 11 ? currentProject.name.slice(0, 11) + "..." : currentProject.name}
            </BreadcrumbLink>
          </Tooltip>
          <Tooltip title={currentRoomPlan.name}>
            <BreadcrumbText>{currentRoomPlan.name.length > 11 ? currentRoomPlan.name.slice(0, 11) + "..." : currentRoomPlan.name}</BreadcrumbText>
          </Tooltip>
        </Breadcrumbs>
      </BreadcrumbsArea>
      {
        isLoading ?
          <Skeleton variant="rectangular" height={"calc(100% - 60px)"} width={"100%"} />
          :
          <Canvas
            projectId={projectId}
            roomPlanId={roomPlanId}
            currentRoomPlan={currentRoomPlan}
            anchors={anchors}
          />
      }
      <AddElementButton onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
    </MainArea >
  );
}

export default MainTypeC;