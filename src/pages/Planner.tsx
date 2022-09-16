import { SideNavbar } from '../components/sideNavbar/SideNavbar';
import { AppBar } from '../components/appBar/AppBar';
import { Main } from '../components/main/Main';

function Planner() {
  const items = [
    { title: "Project 1", url: "" },
    { title: "Project 2", url: "" },
    { title: "Project 3", url: "" },
    { title: "Project 4", url: "" },
    { title: "Project 5", url: "" },
    { title: "Project 6", url: "" },
    { title: "Project 7", url: "" },
    { title: "Project 8", url: "" },
  ]

  return (
    <div>
      <AppBar />
      <SideNavbar items={items} />
      <Main />
    </div>
  );
}

export default Planner;
