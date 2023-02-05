import {
  MainArea,
  AddElementButton,
  BreadcrumbsArea,
  BreadcrumbLink,
  BreadcrumbText
} from "./Main.style";
import RoomPlanList from "../roomPlan/roomPlanList/RoomPlanList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Project, RoomPlan } from "../../types";
import { Breadcrumbs, Tooltip } from "@mui/material";

interface MainTypeBProps {
  isLoading: boolean;
  projectId: string;
  roomPlans: RoomPlan[];
  currentProject: Project;
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void;
  setOpenCreate: (openCreate: boolean) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function MainTypeB(props: MainTypeBProps) {
  const {
    isLoading,
    projectId,
    roomPlans,
    currentProject,
    setCurrentRoomPlan,
    setOpenCreate,
    setOpenUpdate,
    setOpenDelete
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
            <BreadcrumbText>{currentProject.name.length > 25 ? currentProject.name.slice(0, 25) + "..." : currentProject.name}</BreadcrumbText>
          </Tooltip>
        </Breadcrumbs>
      </BreadcrumbsArea>
      <RoomPlanList
        isLoading={isLoading}
        projectId={projectId}
        roomPlans={roomPlans}
        setCurrentRoomPlan={setCurrentRoomPlan}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
      />
      <AddElementButton onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
    </MainArea>
  );
}

export default MainTypeB;