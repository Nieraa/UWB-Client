import AppBar from '../components/appBar/AppBar';
import SideNavbarTypeA from '../components/sideNavbar/SideNavbarTypeA';
import MainTypeA from '../components/main/MainTypeA';
import ProjectCreateForm from '../components/project/projectCreateForm/ProjectCreateForm';
import ProjectUpdateForm from '../components/project/projectUpdateForm/ProjectUpdateForm';
import DeleteDialogTypeA from '../components/deleteDialog/DeleteDialogTypeA';
import ResponseDialog from '../components/responseDialog/ResponseDialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, PassAndUpdateProjects } from '../types';
import { getProjects } from '../services/ProjectsService';

interface ProjectsProps extends PassAndUpdateProjects {
  isLoading: boolean;
  currentProject: Project;
  setCurrentProject: (currentProject: Project) => void;
}

function Projects(props: ProjectsProps) {
  const {
    isLoading,
    projects,
    currentProject,
    setProjects,
    setCurrentProject
  } = props;

  const [collapseNavbar, setCollapseNavbar] = useState<boolean>(true);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openResponse, setOpenResponse] = useState<boolean>(false);
  const [success, setSucccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [navigateUrl, setNavigateUrl] = useState<string>("");

  const navigate = useNavigate();

  function handleCreateProject(success: boolean): void {
    if (!success) {
      setSucccess(false);
      setTitle("Create projects failed");
      setDetail("Some error has ocrured while create project.");
    }
    else {
      getProjects(setProjects);
      setOpenCreate(false);
      setSucccess(true);
      setTitle("Project created!!");
      setDetail("Congratulations, your project has been successfully created.");
    }
    setOpenResponse(true);
  }

  function handleUpdateProject(success: boolean): void {
    setNavigateUrl("");
    if (!success) {
      setSucccess(false);
      setTitle("Update projects failed");
      setDetail("Some error has ocrured while update project.");
    }
    else {
      getProjects(setProjects);
      setOpenUpdate(false);
      setSucccess(true);
      setTitle("Project updated!!");
      setDetail("Congratulations, your project has been successfully updated.");
    }
    setOpenResponse(true);
  }

  function handleClose(): void {
    if (navigateUrl) {
      navigate(`/projects/${navigateUrl}/room-plans`)
    }
    setOpenResponse(false);
  }

  function handleCollapseNavbar() {
    setCollapseNavbar(!collapseNavbar);
  }

  function handleCloseNavbar() {
    setCollapseNavbar(true);
  }

  return (
    <>
      <AppBar handleCollapseNavbar={handleCollapseNavbar} />
      <SideNavbarTypeA
        collapseNavbar={collapseNavbar}
        projectId={currentProject.id}
        projects={projects}
        handleCloseNavbar={handleCloseNavbar}
      />
      <MainTypeA
        isLoading={isLoading}
        projects={projects}
        setCurrentProject={setCurrentProject}
        setOpenCreate={setOpenCreate}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
      />
      <ProjectCreateForm
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        setNavigateUrl={setNavigateUrl}
        handleCreateProject={handleCreateProject}
      />
      <ProjectUpdateForm
        currentProject={currentProject}
        openUpdate={openUpdate}
        setProjects={setProjects}
        setOpenUpdate={setOpenUpdate}
        handleUpdateProject={handleUpdateProject}
      />
      <DeleteDialogTypeA
        currentProject={currentProject}
        openDelete={openDelete}
        setProjects={setProjects}
        setOpenDelete={setOpenDelete}
      />
      <ResponseDialog
        open={openResponse}
        success={success}
        title={title}
        detail={detail}
        handleClose={handleClose}
      />
    </>
  );
}

export default Projects;
