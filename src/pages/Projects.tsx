import { AppBar } from '../components/appBar/AppBar';
import { SideNavbarTypeA } from '../components/sideNavbar/SideNavbarTypeA';
import { MainTypeA } from '../components/main/MainTypeA';
import ProjectCreateForm from '../components/projectCreateForm/ProjectCreateForm';
import { useState } from 'react';
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

  return (
    <div>
      <AppBar />
      <SideNavbarTypeA
        projects={projects}
        setProject={setProject}
        setOpenCreate={setOpenCreate}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
      />
      <MainTypeA
        projects={projects}
        setProject={setProject}
        setOpenCreate={setOpenCreate}
        setOpenUpdate={setOpenUpdate}
        setOpenDelete={setOpenDelete}
      />
      <ProjectCreateForm
        setProjects={setProjects}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
      />
      <ProjectUpdateForm
        project={project}
        openUpdate={openUpdate}
        setProjects={setProjects}
        setOpenUpdate={setOpenUpdate}
      />
      <DeleteDialogTypeA
        project={project}
        setProjects={setProjects}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
    </div>
  );
}

export default Projects;
