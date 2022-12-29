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
  setProject: (project: Project) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

export const ProjectList = (props: ProjectListProps) => {
  const {
    projects,
    setProject,
    setOpenUpdate,
    setOpenDelete
  } = props;


  function handleDelete(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    project: Project
  ): void {
    e.preventDefault();
    e.stopPropagation();
    setProject(project)
    setOpenDelete(true);
  }

  function handleUpdate(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    project: Project
  ) {
    e.preventDefault();
    e.stopPropagation();
    setProject(project);
    setOpenUpdate(true);
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
        )}
      </Grid>
    </ProjectWrapper >
  );
};