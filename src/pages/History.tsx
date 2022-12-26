import { AppBar } from '../components/appBar/AppBar';
import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { Main } from '../components/main/Main';
import { useState } from 'react';
import { PassAndUpdateProjects } from '../types';

function History(props: PassAndUpdateProjects) {
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
        pathname={"history"}
        setOpen={setOpen}
      />
    </div>
  );
}

export default History;
