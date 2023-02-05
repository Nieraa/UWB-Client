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
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Project } from "../../types";

interface SideNavbarTypeAProps {
  collapseNavbar: boolean;
  projectId: string;
  projects: Project[];
  handleCloseNavbar: () => void;
}

function SideNavbarTypeA(props: SideNavbarTypeAProps) {
  const {
    collapseNavbar,
    projectId,
    projects,
    handleCloseNavbar
  } = props;

  const [collapse, setCollapse] = useState<boolean>(true);

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
    <Tint onClick={handleCloseNavbar} collapseNavbar={collapseNavbar}>
      <Navbar collapseNavbar={collapseNavbar}>
        <NavItem>
          <NavLink
            to="/projects"
            $focusMenu={projectId === ""}
            $hasSubMenu={hasSubMenu}
          >
            {hasSubMenu &&
              <FontAwesomeIcon
                icon={collapse ? faCaretRight : faCaretDown}
                onClick={handleCollapse}
              />
            }
            <FontAwesomeIcon icon={faFolderOpen} />
            Projects
          </NavLink>
          {hasSubMenu &&
            <SubMenu
              collapse={collapse}
              length={projects.length}
            >
              {projects.map((project) =>
                <li key={project.id}>
                  <SubMenuLink
                    to={`/projects/${project.id}/room-plans`}
                    $focusMenu={project.id === projectId}
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
    </Tint>
  );
}

export default SideNavbarTypeA;