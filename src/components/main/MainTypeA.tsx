import {
  MainArea,
  AddButton,
  BreadcrumbText,
  BreadcrumbsArea
} from "./Main.style";
import ProjectList from "../project/projectList/ProjectList";
import { Breadcrumbs, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MainTypeAProps } from "../../types";

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
          <Tooltip title="Projects" arrow>
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
      <Tooltip title="Create Project" placement="left" arrow>
        <AddButton onClick={handleClickOpen}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </Tooltip>
    </MainArea>
  );
};

export default MainTypeA;