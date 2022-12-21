import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { AppBar } from '../components/appBar/AppBar';
import { Main } from '../components/main/Main';
import { useState } from 'react';

function Planner() {
  const [open, setOpen] = useState<boolean>(false);

  const projects = [
    { id: "1", projectName: "Project 1" },
    { id: "2", projectName: "Project 2" },
    { id: "3", projectName: "Project 3" },
    { id: "4", projectName: "Project 4" },
    { id: "5", projectName: "Project 5" },
    { id: "6", projectName: "Project 6" },
    { id: "7", projectName: "Project 7" },
    { id: "8", projectName: "Project 8" },
  ]

  return (
    <div>
      <AppBar />
      <SideNavbar
        projects={projects}
        setOpen={setOpen}
      />
      <Main
        projects={projects}
        pathname={"planner"}
        setOpen={setOpen}
      />
    </div>
  );
}

export default Planner;
