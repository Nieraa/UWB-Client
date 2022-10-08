import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { AppBar } from '../components/appBar/AppBar';
import { Main } from '../components/main/Main';

function Realtime() {
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
      <SideNavbar items={items} />
      <Main items={items} pathname={"realtime"}/>
    </div>
  );
}

export default Realtime;
