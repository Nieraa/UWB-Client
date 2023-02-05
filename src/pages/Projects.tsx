import AppBar from '../components/appBar/AppBar';
import SideNavbarTypeA from '../components/sideNavbar/SideNavbarTypeA';
import MainTypeA from '../components/main/MainTypeA';
import ProjectCreateForm from '../components/project/projectCreateForm/ProjectCreateForm';
import ProjectUpdateForm from '../components/project/projectUpdateForm/ProjectUpdateForm';
import DeleteDialogTypeA from '../components/deleteDialog/DeleteDialogTypeA';
import { useState } from 'react';
import { Project, PassAndUpdateProjects } from '../types';

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

  function handleCollapseNavbar() {
    setCollapseNavbar(!collapseNavbar);
  }

  function handleCloseNavbar() {
    setCollapseNavbar(true);
  }

  return (
    <div>
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
        setProjects={setProjects}
        setOpenCreate={setOpenCreate}
      />
      <ProjectUpdateForm
        currentProject={currentProject}
        openUpdate={openUpdate}
        setProjects={setProjects}
        setOpenUpdate={setOpenUpdate}
      />
      <DeleteDialogTypeA
        currentProject={currentProject}
        openDelete={openDelete}
        setProjects={setProjects}
        setOpenDelete={setOpenDelete}
      />
    </div>
  );
}

export default Projects;
