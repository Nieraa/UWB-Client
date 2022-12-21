import { Params, useParams } from "react-router-dom";
import { Canvas } from "../canvas/Canvas";
import { ProjectList } from "../projectList/ProjectList";
import {
  AddElementButton,
  MainArea,
  ProjectName
} from "./Main.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Dispatch,
  SetStateAction
} from "react";
import { Project } from "../../types";

interface MainProps {
  projects: Project[];
  pathname: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Main = (props: MainProps) => {
  const { projects, pathname, setOpen } = props;
  const params: Readonly<Params<string>> = useParams();

  const handleClickOpen = () => {
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
            {projects[Number(params.projectId) - 1].projectName}
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