import {
  ListWrapper,
  ListElementLink,
  ListElementNameWrapper,
  ListElementName
} from "../../../Styles/Styles.style";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Tooltip
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Project, ProjectListProps } from "../../../types";

function ProjectList(props: ProjectListProps) {
  const {
    isLoading,
    projects,
    setCurrentProject,
    setOpenUpdate,
    setOpenDelete
  } = props;

  const skeletonArr = [1, 2, 3, 4, 5];

  function handleUpdate(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    project: Project
  ) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentProject(project);
    setOpenUpdate(true);
  }

  function handleDelete(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    project: Project
  ): void {
    e.preventDefault();
    e.stopPropagation();
    setCurrentProject(project);
    setOpenDelete(true);
  }

  return (
    <ListWrapper>
      <Grid
        container
        spacing={3}
        px={5}
        py={3}
      >
        {isLoading ?
          <>
            {skeletonArr.map((element) =>
              <Grid item
                xs={12}
                sm={6}
                lg={4}
                xl={3}
                key={element}
              >
                <Skeleton variant="rounded" height={58} animation="wave" />
              </Grid>
            )}
          </>
          :
          <>
            {projects.map((project) =>
              <Grid item
                xs={12}
                sm={6}
                lg={4}
                xl={3}
                key={project.id}
              >
                <Card>
                  <CardActionArea>
                    <ListElementLink
                      to={`/projects/${project.id}/room-plans`}
                    >
                      <CardContent>
                        <ListElementNameWrapper>
                          <ListElementName>
                            {project.name.length > 18 ?
                              project.name.slice(0, 18) + "..."
                              :
                              project.name
                            }
                          </ListElementName>
                          <Tooltip title="Edit Project" arrow>
                            <FontAwesomeIcon
                              icon={faPen}
                              onClick={(e) => {
                                handleUpdate(e, project);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Delete Project" arrow>
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              onClick={(e) => {
                                handleDelete(e, project);
                              }}
                            />
                          </Tooltip>
                        </ListElementNameWrapper>
                      </CardContent>
                    </ListElementLink>
                  </CardActionArea>
                </Card>
              </Grid>
            )
            }
          </>
        }
      </Grid>
    </ListWrapper>
  );
}

export default ProjectList;