import {
  Tint,
  Navbar,
  NavItem,
  NavLink,
  SubMenu,
  SubMenuLink,
} from "./SideNavbar.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faFileLines,
  faCaretRight,
  faCaretDown,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SideNavbarTypeAProps } from "../../types";

function SideNavbarTypeA(props: SideNavbarTypeAProps) {
  const {
    collapseNavbar,
    projectId,
    projects,
    handleCloseNavbar
  } = props;

  const [collapse, setCollapse] = useState<boolean>(true);
  const location = useLocation();

  const hasSubMenu: boolean = projects.length !== 0 ? true : false;

  function handleCollapse(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    }): void {
    setCollapse(!collapse);
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <Tint onClick={handleCloseNavbar} collapseNavbar={collapseNavbar} />
      <Navbar collapseNavbar={collapseNavbar}>
        <NavItem>
          <NavLink
            to="/projects"
            $focusMenu={location.pathname === "/projects"}
            $hasSubMenu={hasSubMenu}
          >
            {hasSubMenu &&
              <FontAwesomeIcon
                icon={collapse ? faCaretRight : faCaretDown}
                onClick={handleCollapse}
              />
            }
            <FontAwesomeIcon icon={collapse || !hasSubMenu ? faFolder : faFolderOpen} />
            Projects
          </NavLink>
          {hasSubMenu &&
            <SubMenu
              collapse={collapse}
              length={projects.length}
              hasBorder={
                location.pathname.slice(projectId.length + 43) === "planner" ||
                location.pathname.slice(projectId.length + 43) === "realtime" ||
                location.pathname.slice(projectId.length + 43) === "location-log"
              }
            >
              {projects.map((project) =>
                <li key={project.id}>
                  <SubMenuLink
                    to={`/projects/${project.id}/room-plans`}
                    $focusMenu={project.id === projectId && location.pathname !== "/projects"}
                    onClick={() => {
                      setCollapse(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faFileLines} />
                    {project.name.length > 14 ?
                      project.name.slice(0, 14) + "..."
                      :
                      project.name
                    }
                  </SubMenuLink>
                </li>
              )}
            </SubMenu>
          }
        </NavItem>
      </Navbar>
    </>
  );
}

export default SideNavbarTypeA;