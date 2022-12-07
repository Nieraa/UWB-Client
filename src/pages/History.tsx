import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { AppBar } from '../components/appBar/AppBar';
import { Main } from '../components/main/Main';
import { useState } from 'react';

function History() {
  const [open, setOpen] = useState(false);

  const items = [
    { id: "1", title: "Project 1" },
    { id: "2", title: "Project 2" },
    { id: "3", title: "Project 3" },
    { id: "4", title: "Project 4" },
    { id: "5", title: "Project 5" },
    { id: "6", title: "Project 6" },
    { id: "7", title: "Project 7" },
    { id: "8", title: "Project 8" },
  ]

  return (
    <div>
      <AppBar />
      <SideNavbar items={items} setOpen={setOpen}/>
      <Main items={items} pathname={"history"} setOpen={setOpen}/>
    </div>
  );
}

export default History;
