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
  setOpen: (open: boolean) => void;
}

export const MainTypeA = (props: MainTypeAProps) => {
  const { projects, setOpen } = props;

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  return (
    <MainArea>
      <ProjectList projects={projects} />
      <AddElementButton onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </AddElementButton>
    </MainArea>
  );
};