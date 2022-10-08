import { Params, useLocation, useParams } from "react-router-dom";
import { Canvas } from "../canvas/Canvas";
import { ProjectList } from "../projectList/ProjectList";
import { MainArea, ProjectName } from "./Main.style";

interface ItemProps {
  id: string;
  title: string;
}

interface MainProps {
  items: ItemProps[];
  pathname: string;
}

export const Main = (props: MainProps) => {
  const { items, pathname } = props;
  const params: Readonly<Params<string>> = useParams();
  
  return (
    <MainArea>
      {pathname === 'projects' ?
        <ProjectList items={items}/>
        :
        <>
          <ProjectName>
            {items[Number(params.projectId) - 1].title}
          </ProjectName>
          {pathname === 'planner' ?
            <Canvas />
            :
            pathname === 'realtime' ?
              <></>
              :
              pathname === 'history' ?
                <></>
                :
                <></>
          }
        </>
      }
    </MainArea>
  );
};