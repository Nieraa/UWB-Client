import { ProjectList } from "../projectList/ProjectList";
import {
  MainArea,
  AddElementButton
} from "./Main.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../types";

interface MainTypeAProps {
  projects: Project[];
  setOpenCreate: (openCreate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
  setDeleteProjectId: (deleteProjectId: string) => void;
  setDeleteProjectName: (deleteProjectName: string) => void;
}

export const MainTypeA = (props: MainTypeAProps) => {
  const {
    projects,
    setOpenCreate,
    setOpenDelete,
    setDeleteProjectId,
    setDeleteProjectName
  } = props;

  const handleClickOpen = (): void => {
    setOpenCreate(true);
  };

  return (
    <MainArea>
      <ProjectList
        projects={projects}
        setOpenDelete={setOpenDelete}
        setDeleteProjectId={setDeleteProjectId}
        setDeleteProjectName={setDeleteProjectName}
      />
      <AddElementButton onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
    </MainArea>
  );
};