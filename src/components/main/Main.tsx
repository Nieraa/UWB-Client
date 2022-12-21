import { Params, useLocation, useParams } from "react-router-dom";
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
  SetStateAction,
  useEffect
} from "react";
import { Project } from "../../types";
import axios from "../../axios";

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

  const location = useLocation();

  useEffect(() => {
    axios
      .get(`/projects`)
      .then((response) => {
        // setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(location);
  }, [location]);

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
            {projects[projects.findIndex((element) => element.id === params.projectId)].projectName}
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