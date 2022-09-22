import { Params, useParams } from "react-router-dom";
import { MainArea, Planner, ProjectName } from "./Main.style";

interface ItemProps {
  id: string;
  title: string;
}

interface MainProps {
  items: ItemProps[];
}

export const Main = (props: MainProps) => {
  const { items } = props;
  const params: Readonly<Params<string>> = useParams();

  const hasProjectId: boolean = params.projectId ? true : false;

  return (
    <MainArea>
      {hasProjectId && 
        <>
          <ProjectName>
            {items[Number(params.projectId) - 1].title}
          </ProjectName>
          <Planner />
        </>
      }
    </MainArea>
  );
};