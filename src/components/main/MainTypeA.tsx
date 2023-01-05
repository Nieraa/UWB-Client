import ProjectList from "../projectList/ProjectList";
import {
  MainArea,
  AddElementButton
} from "./Main.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../types";

interface MainTypeAProps {
  projects: Project[];
  setProject: (project: Project) => void;
  setOpenCreate: (openCreate: boolean) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function MainTypeA(props: MainTypeAProps) {
  const {
    projects,
    setProject,
    setOpenCreate,
    setOpenUpdate,
    setOpenDelete
  } = props;

  function handleClickOpen(): void {
    setOpenCreate(true);
  };

  return (
    <MainArea>
      <ProjectList
        projects={projects}
        setProject={setProject}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
      />
      <AddElementButton onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
    </MainArea>
  );
};

export default MainTypeA;