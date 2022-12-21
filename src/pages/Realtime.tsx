import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { AppBar } from '../components/appBar/AppBar';
import { Main } from '../components/main/Main';
import { useEffect, useState } from 'react';
import axios from '../axios';
import { PassAndUpdateProjects } from '../types';

function Realtime(props: PassAndUpdateProjects) {
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
        pathname={"realtime"}
        setOpen={setOpen}
      />
    </div>
  );
}

export default Realtime;
