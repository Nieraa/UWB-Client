import {
  MainArea,
  AddButton,
  BreadcrumbText,
  BreadcrumbsArea
} from "./Main.style";
import ProjectList from "../project/projectList/ProjectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../types";
import { Breadcrumbs, Tooltip } from "@mui/material";

interface MainTypeAProps {
  isLoading: boolean;
  projects: Project[];
  setCurrentProject: (currentProject: Project) => void;
  setOpenCreate: (openCreate: boolean) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function MainTypeA(props: MainTypeAProps) {
  const {
    isLoading,
    projects,
    setCurrentProject,
    setOpenCreate,
    setOpenUpdate,
    setOpenDelete
  } = props;

  function handleClickOpen(): void {
    setOpenCreate(true);
  }

  return (
    <MainArea>
      <BreadcrumbsArea>
        <Breadcrumbs aria-label="breadcrumb">
          <Tooltip title="Projects">
            <BreadcrumbText>Projects</BreadcrumbText>
          </Tooltip>
        </Breadcrumbs>
      </BreadcrumbsArea>
      <ProjectList
        isLoading={isLoading}
        projects={projects}
        setCurrentProject={setCurrentProject}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
      />
      <Tooltip title="Create Project" placement="left">
        <AddButton onClick={handleClickOpen}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </Tooltip>
    </MainArea>
  );
};

export default MainTypeA;