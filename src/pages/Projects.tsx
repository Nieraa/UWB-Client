import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { AppBar } from '../components/appBar/AppBar';
import { Main } from '../components/main/Main';
import { useState } from 'react';
import { PassAndUpdateProjects } from '../types';
import ProjectCreateForm from '../components/projectCreateForm/ProjectCreateForm';

function Projects(props: PassAndUpdateProjects) {
  const { projects, setProjects } = props;
  const [open, setOpen] = useState(false);

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
