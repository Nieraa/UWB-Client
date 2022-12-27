import { AppBar } from '../components/appBar/AppBar';
import { SideNavbarTypeA } from '../components/sideNavbar/SideNavbarTypeA';
import { MainTypeA } from '../components/main/MainTypeA';
import ProjectCreateForm from '../components/projectCreateForm/ProjectCreateForm';
import { useState } from 'react';
import { PassAndUpdateProjects } from '../types';

function Projects(props: PassAndUpdateProjects) {
  const { projects, setProjects } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <AppBar />
      <SideNavbarTypeA
        projects={projects}
        setOpen={setOpen}
      />
      <MainTypeA
        projects={projects}
        setOpen={setOpen}
      />
      <ProjectCreateForm setProjects={setProjects} open={open} setOpen={setOpen} />
    </div>
  );
}

export default Projects;
