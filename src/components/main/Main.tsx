import { Canvas } from "../canvas/Canvas";
import { ProjectList } from "../projectList/ProjectList";
import {
  MainArea,
  ProjectName,
  AddElementButton
} from "./Main.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Dispatch,
  SetStateAction,
} from "react";
import { Params, useParams } from "react-router-dom";
import { Project } from "../../types";

interface MainProps {
  projects: Project[];
  pathname: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Main = (props: MainProps) => {
  const { projects, pathname, setOpen } = props;
  
  const params: Readonly<Params<string>> = useParams();
  const project: Project = projects.length === 0 ? 
  {
    id: params.projectId ? params.projectId : "",
    projectName: "",
    imgUrl: "",
    l: 0,
    w: 0,
  }: 
  projects[projects.findIndex((element) => element.id === params.projectId)];

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  return (
    <MainArea>
      {pathname === 'projects' ?
        <>
          <ProjectList projects={projects} />
          <AddElementButton onClick={handleClickOpen}>
            <FontAwesomeIcon icon={faPlus} />
          </AddElementButton>
        </>
        :
        <>
          <ProjectName>
            {projects.length === 0 ? "" : project.projectName}
          </ProjectName>
          {pathname === 'planner' ?
            <Canvas
              project={project}/>
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