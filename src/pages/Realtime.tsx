import { AppBar } from '../components/appBar/AppBar';
import { SideNavbarTypeA } from '../components/sideNavbar/SideNavbarTypeA';
import { MainTypeA } from '../components/main/MainTypeA';
import { useState } from 'react';
import { PassAndUpdateProjects } from '../types';

function Realtime(props: PassAndUpdateProjects) {
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
    </div>
  );
}

export default Realtime;
