import { Card, CardActionArea, CardContent, CardMedia, Divider, Grid } from "@mui/material";
import {
  ProjectLink,
  ProjectName,
  ProjectWrapper,
} from "./ProjectList.style";

interface ItemProps {
  id: string;
  title: string;
}

interface ProjectListProps {
  items: ItemProps[];
}


export const ProjectList = (props: ProjectListProps) => {
  const { items } = props;
  
  return (
    <ProjectWrapper>
      <Grid container spacing={3} px={5}>
        {items.map((item) =>
          <Grid item xs={6} lg={4} xl={3}>
            <Card>
              <CardActionArea>
                <ProjectLink to={`/${item.id}/planner`}>
                <CardMedia
                  component="img"
                  height="160"
                  image="https://c4.wallpaperflare.com/wallpaper/974/565/254/windows-11-windows-10-minimalism-hd-wallpaper-preview.jpg"
                  alt={item.title + " plan"}
                />
                <Divider />
                <CardContent>
                  <ProjectName>
                    {item.title}
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