import {
  ProjectWrapper,
  ProjectLink,
  ProjectName,
  ProjectNameWrapper
} from "./RoomPlanList.style";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { RoomPlan } from "../../../types";


interface RoomPlanListProps {
  projectId: string,
  roomPlans: RoomPlan[];
  setCurrentRoomPlan: (currentRoomPlan: RoomPlan) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function RoomPlanList(props: RoomPlanListProps) {
  const {
    projectId,
    roomPlans,
    setCurrentRoomPlan,
    setOpenUpdate,
    setOpenDelete
  } = props;

  function handleUpdate(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    roomPlan: RoomPlan
  ) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentRoomPlan(roomPlan);
    setOpenUpdate(true);
  }

  function handleDelete(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    roomPlan: RoomPlan
  ): void {
    e.preventDefault();
    e.stopPropagation();
    setCurrentRoomPlan(roomPlan);
    setOpenDelete(true);
  }

  return (
    <ProjectWrapper>
      <Grid
        container
        spacing={3}
        px={5}
        py={3}
      >
        {roomPlans.map((roomPlan) =>
          <Grid item
            xs={12}
            md={6}
            lg={4}
            xl={3}
            key={roomPlan.id}
          >
            <Card>
              <CardActionArea>
                <ProjectLink
                  to={`/projects/${projectId}/room-plans/${roomPlan.id}/planner`}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={roomPlan.image ?
                      roomPlan.image
                      :
                      process.env.PUBLIC_URL + "/static/images/no_image.png"
                    }
                  alt={roomPlan.name + " plan"}
                    />
                  <Divider />
                  <CardContent>
                    <ProjectNameWrapper>
                      <ProjectName>
                        {roomPlan.name.length > 18 ?
                          roomPlan.name.slice(0, 18) + "..."
                          :
                          roomPlan.name
                        }
                      </ProjectName>
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={(e) => {
                          handleUpdate(e, roomPlan);
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={(e) => {
                          handleDelete(e, roomPlan);
                        }}
                      />
                    </ProjectNameWrapper>
                  </CardContent>
                </ProjectLink>
              </CardActionArea>
            </Card>
          </Grid>
        )}
      </Grid>
    </ProjectWrapper >
  );
}

export default RoomPlanList;