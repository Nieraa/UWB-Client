import {
  MainArea,
  BreadcrumbsArea,
  AddElementButton,
  BreadcrumbLink,
  BreadcrumbText
} from "./Main.style";
import Canvas from "../canvas/Canvas";
import { Breadcrumbs } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Node, Project, RoomPlan } from "../../types";

interface MainTypeCProps {
  anchors: Node[];
  currentProject: Project;
  currentRoomPlan: RoomPlan;
  setOpenCreate: (openCreate: boolean) => void;
}

function MainTypeC(props: MainTypeCProps) {
  const {
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
          <BreadcrumbLink to="/projects">
            Projects
          </BreadcrumbLink>
          <BreadcrumbLink to={`/projects/${currentProject.id}/room-plans`}>
            {currentProject.name}
          </BreadcrumbLink>
          <BreadcrumbText>{currentRoomPlan.name}</BreadcrumbText>
        </Breadcrumbs>
      </BreadcrumbsArea>
      <Canvas
        currentRoomPlan={currentRoomPlan}
        anchors={anchors}
      />
      <AddElementButton onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
    </MainArea >
  );
}

export default MainTypeC;