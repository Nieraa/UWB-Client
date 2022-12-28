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
  CardMedia,
  Divider
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../types";


interface ProjectListProps {
  projects: Project[];
  setOpenDelete: (openDelete: boolean) => void;
  setDeleteProjectId: (deleteProjectId: string) => void;
  setDeleteProjectName: (deleteProjectName: string) => void
}

export const ProjectList = (props: ProjectListProps) => {
  const {
    projects,
    setOpenDelete,
    setDeleteProjectId,
    setDeleteProjectName
  } = props;


  function handleDelete(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    projectId: string,
    projectName: string
  ): void {
    e.preventDefault();
    e.stopPropagation();
    setDeleteProjectId(projectId);
    setDeleteProjectName(projectName);
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
                <ProjectLink to={`/${project.id}/planner`}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={project.imgUrl}
                    alt={project.projectName + " plan"}
                  />
                  <Divider />
                  <CardContent>
                    <ProjectNameWrapper>
                      <ProjectName>
                        {project.projectName.length > 18 ?
                          project.projectName.slice(0, 18) + "..."
                          :
                          project.projectName
                        }
                      </ProjectName>
                      <FontAwesomeIcon
                        icon={faPen}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={(e) => {
                          handleDelete(e, project.id, project.projectName);
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
};