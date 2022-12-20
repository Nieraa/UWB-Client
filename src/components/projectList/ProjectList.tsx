import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid
} from "@mui/material";
import {
  ProjectLink,
  ProjectName,
  ProjectWrapper,
} from "./ProjectList.style";

interface ProjectProps {
  id: string;
  title: string;
}

interface ProjectListProps {
  projects: ProjectProps[];
}


export const ProjectList = (props: ProjectListProps) => {
  const { projects } = props;

  return (
    <ProjectWrapper>
      <Grid
        container
        spacing={3}
        px={5}
      >
        {projects.map((project) =>
          <Grid item
            xs={6}
            lg={4}
            xl={3}
          >
            <Card>
              <CardActionArea>
                <ProjectLink to={`/${project.id}/planner`}>
                  <CardMedia
                    component="img"
                    height="160"
                    image="https://c4.wallpaperflare.com/wallpaper/974/565/254/windows-11-windows-10-minimalism-hd-wallpaper-preview.jpg"
                    alt={project.title + " plan"}
                  />
                  <Divider />
                  <CardContent>
                    <ProjectName>
                      {project.title}
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