import { AppBar } from '../components/appBar/AppBar';
import { SideNavbarTypeA } from '../components/sideNavbar/SideNavbarTypeA';
import { MainTypeA } from '../components/main/MainTypeA';
import ProjectCreateForm from '../components/projectCreateForm/ProjectCreateForm';
import { useEffect, useState } from 'react';
import { PassAndUpdateProjects, Project } from '../types';
import DeleteDialogTypeA from '../components/deleteDialog/DeleteDialogTypeA';
import ProjectUpdateForm from '../components/projectUpdateForm/ProjectUpdateForm';

function Projects(props: PassAndUpdateProjects) {
  const { projects, setProjects } = props;

  const [project, setProject] = useState<Project>({
    id: "",
    projectName: "",
    imgUrl: "",
    l: 0,
    w: 0,
  });
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string>("");
  const [deleteProjectName, setDeleteProjectName] = useState<string>("");

  return (
    <div>
      <AppBar />
      <SideNavbarTypeA
        projects={projects}
        setProject={setProject}
        setOpenCreate={setOpenCreate}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
        setDeleteProjectId={setDeleteProjectId}
        setDeleteProjectName={setDeleteProjectName}
      />
      <MainTypeA
        projects={projects}
        setProject={setProject}
        setOpenCreate={setOpenCreate}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
        setDeleteProjectId={setDeleteProjectId}
        setDeleteProjectName={setDeleteProjectName}
      />
      <ProjectCreateForm
        setProjects={setProjects}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
      />
      <ProjectUpdateForm
        project={project}
        setProjects={setProjects}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
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
