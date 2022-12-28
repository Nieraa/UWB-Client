import { AppBar } from '../components/appBar/AppBar';
import { SideNavbarTypeA } from '../components/sideNavbar/SideNavbarTypeA';
import { MainTypeA } from '../components/main/MainTypeA';
import ProjectCreateForm from '../components/projectCreateForm/ProjectCreateForm';
import { useState } from 'react';
import { PassAndUpdateProjects } from '../types';
import DeleteDialogTypeA from '../components/deleteDialog/DeleteDialogTypeA';

function Projects(props: PassAndUpdateProjects) {
  const { projects, setProjects } = props;

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string>("");
  const [deleteProjectName, setDeleteProjectName] = useState<string>("");

  return (
    <div>
      <AppBar />
      <SideNavbarTypeA
        projects={projects}
        setOpen={setOpenCreate}
        setOpenDelete={setOpenDelete}
        setDeleteProjectId={setDeleteProjectId}
        setDeleteProjectName={setDeleteProjectName}
      />
      <MainTypeA
        projects={projects}
        setOpenCreate={setOpenCreate}
        setOpenDelete={setOpenDelete}
        setDeleteProjectId={setDeleteProjectId}
        setDeleteProjectName={setDeleteProjectName}
      />
      <ProjectCreateForm
        setProjects={setProjects}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
      />
      <DeleteDialogTypeA
        projectId={deleteProjectId}
        projectName={deleteProjectName}
        setProjects={setProjects}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
    </div>
  );
}

export default Projects;
