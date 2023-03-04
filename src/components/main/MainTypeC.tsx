import {
  MainArea,
  BreadcrumbsArea,
  AddButton,
  BreadcrumbLink,
  BreadcrumbText,
  SkeletonCanvas,
  PageName
} from "./Main.style";
import Canvas from "../canvas/Canvas";
import { Breadcrumbs, Skeleton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MainTypeCProps } from "../../types";

function MainTypeC(props: MainTypeCProps) {
  const {
    isPlanner,
    isLoading,
    projectId,
    roomPlanId,
    anchors,
    tags,
    currentProject,
    currentRoomPlan,
    setOpenCreate
  } = props;

  function handleClickOpen(): void {
    if (setOpenCreate) {
      setOpenCreate(true);
    }
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
            <BreadcrumbLink to={`/projects/${currentProject.id}/room-plans`}>
              {isLoading ?
                <Skeleton width={90} animation="wave" />
                :
                currentProject.name.length > 11 ? currentProject.name.slice(0, 11) + "..." : currentProject.name
              }
            </BreadcrumbLink>
          </Tooltip>
          <Tooltip title={currentRoomPlan.name} arrow>
            <BreadcrumbText>
              {isLoading ?
                <Skeleton width={90} animation="wave" />
                :
                currentRoomPlan.name.length > 11 ? currentRoomPlan.name.slice(0, 11) + "..." : currentRoomPlan.name
              }
            </BreadcrumbText>
          </Tooltip>
        </Breadcrumbs>
      </BreadcrumbsArea>
      <PageName>
        {isPlanner ? "Planner page" : "Real-time Tracking page"}
      </PageName>
      {
        isLoading ?
          <SkeletonCanvas>
            <Skeleton variant="rectangular" height={"calc(100% - 120px)"} width={"80%"} animation="wave" />
          </SkeletonCanvas>
          :
          <Canvas
            isPlanner={isPlanner}
            projectId={projectId}
            roomPlanId={roomPlanId}
            currentRoomPlan={currentRoomPlan}
            anchors={anchors}
            tags={tags}
          />
      }
      {setOpenCreate &&
        <Tooltip title="Create Anchor" placement="left" arrow>
          <AddButton onClick={handleClickOpen}>
            <FontAwesomeIcon icon={faPlus} />
          </AddButton>
        </Tooltip>
      }
    </MainArea >
  );
}

export default MainTypeC;