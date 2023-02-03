import {
  ProjectWrapper,
  ProjectLink,
  ProjectName,
  ProjectNameWrapper
} from "./ProjectList.style";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../../types";


interface ProjectListProps {
  isLoading: boolean;
  projects: Project[];
  setCurrentProject: (currentProject: Project) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

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
    <ProjectWrapper>
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
                md={6}
                lg={4}
                xl={3}
                key={element}
              >
                <Skeleton variant="rounded" height={58} />
              </Grid>
            )}
          </>
          :
          <>
            {projects.map((project) =>
              <Grid item
                xs={12}
                md={6}
                lg={4}
                xl={3}
                key={project.id}
              >
                <Card>
                  <CardActionArea>
                    <ProjectLink
                      to={`/projects/${project.id}/room-plans`}
                    >
                      <CardContent>
                        <ProjectNameWrapper>
                          <ProjectName>
                            {project.name.length > 18 ?
                              project.name.slice(0, 18) + "..."
                              :
                              project.name
                            }
                          </ProjectName>
                          <FontAwesomeIcon
                            icon={faPen}
                            onClick={(e) => {
                              handleUpdate(e, project);
                            }}
                          />
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={(e) => {
                              handleDelete(e, project);
                            }}
                          />
                        </ProjectNameWrapper>
                      </CardContent>
                    </ProjectLink>
                  </CardActionArea>
                </Card>
              </Grid>
            )
            }
          </>
        }
      </Grid>
    </ProjectWrapper >
  );
}

export default ProjectList;