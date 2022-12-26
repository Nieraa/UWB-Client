import { AppBar } from '../components/appBar/AppBar';
import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { Main } from '../components/main/Main';
import ProjectCreateForm from '../components/projectCreateForm/ProjectCreateForm';
import { useState } from 'react';
import { PassAndUpdateProjects } from '../types';

function Projects(props: PassAndUpdateProjects) {
  const { projects, setProjects } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <AppBar />
      <SideNavbar
        projects={projects}
        setOpen={setOpen}
      />
      <Main
        projects={projects}
        pathname={"projects"}
        setOpen={setOpen}
      />
      <ProjectCreateForm setProjects={setProjects} open={open} setOpen={setOpen} />
    </div>
  );
}

export default Projects;
