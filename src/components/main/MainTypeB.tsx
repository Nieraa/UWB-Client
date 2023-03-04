import {
  MainArea,
  AddButton,
  BreadcrumbsArea,
  BreadcrumbLink,
  BreadcrumbText
} from "./Main.style";
import RoomPlanList from "../roomPlan/roomPlanList/RoomPlanList";
import { Breadcrumbs, Skeleton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MainTypeBProps } from "../../types";

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
          <Tooltip title="Projects" arrow>
            <BreadcrumbLink to="/projects">
              Projects
            </BreadcrumbLink>
          </Tooltip>
          <Tooltip title={currentProject.name} arrow>
            <BreadcrumbText>
              {isLoading ?
                <Skeleton width={150} />
                :
                currentProject.name.length > 25 ? currentProject.name.slice(0, 25) + "..." : currentProject.name
              }
            </BreadcrumbText>
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
      <Tooltip title="Create Room plan" placement="left" arrow>
        <AddButton onClick={handleClickOpen}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </Tooltip>
    </MainArea>
  );
}

export default MainTypeB;