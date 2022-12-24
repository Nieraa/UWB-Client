import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid
} from "@mui/material";
import { Project } from "../../types";
import {
  ProjectLink,
  ProjectName,
  ProjectWrapper,
} from "./ProjectList.style";


interface ProjectListProps {
  projects: Project[];
}


export const ProjectList = (props: ProjectListProps) => {
  const { projects } = props;

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
            xs={6}
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
                    <ProjectName>
                      {project.projectName}
                    </ProjectName>
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