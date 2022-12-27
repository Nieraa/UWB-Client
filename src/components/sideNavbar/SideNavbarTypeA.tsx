import {
  Navbar,
  NavItem,
  NavLink,
  SubMenu,
  SubMenuLink,
} from "./SideNavbar.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faMapLocationDot,
  faFolderOpen,
  faFileLines,
  faCaretRight,
  faCaretDown,
  faPlus,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";
import {
  Params,
  useLocation,
  useParams
} from "react-router-dom";
import { useState } from "react";
import { Project } from "../../types";

interface SideNavbarTypeAProps {
  projects: Project[];
  setOpen: (open: boolean) => void;
}

export const SideNavbarTypeA = (props: SideNavbarTypeAProps) => {
  const { projects, setOpen } = props;

  const [collapse, setCollapse] = useState<boolean>(true);

  const params: Readonly<Params<string>> = useParams();
  const location = useLocation();

  const hasProjectId: boolean = params.projectId ? true : false;
  const hasSubMenu: boolean = projects.length > 0 ? true : false;

  function handleCollapse(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    }): void {
    setCollapse(!collapse);
    e.preventDefault();
    e.stopPropagation();
  }

  function handleAdd(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    }): void {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }

  return (
    <Navbar>
      <NavItem>
        <NavLink
          to="/"
          $focusMenu={location.pathname === '/'}
          $hasSubMenu={hasSubMenu}
          $hasProjectId={hasProjectId}
        >
          {hasSubMenu &&
            <FontAwesomeIcon
              icon={collapse ? faCaretRight : faCaretDown}
              onClick={handleCollapse}
            />
          }
          <FontAwesomeIcon icon={faFolderOpen} />
          Projects
          {!hasProjectId &&
            <FontAwesomeIcon
              icon={faPlus}
              onClick={handleAdd}
            />
          }
        </NavLink>
        {hasSubMenu &&
          <SubMenu
            collapse={collapse}
            length={projects.length}
          >
            {projects.map((project) =>
              <li key={project.id}>
                <SubMenuLink
                  to={`/${project.id}/planner`}
                  $focusMenu={hasProjectId && params.projectId === project.id ? true : false}
                  onClick={() => hasProjectId && params.projectId !== project.id && setCollapse(true)}
                >
                  <FontAwesomeIcon icon={faFileLines} />
                  {project.projectName.length > 18 ?
                    project.projectName.slice(0, 18) + "..."
                    :
                    project.projectName
                  }
                </SubMenuLink>
              </li>
            )}
          </SubMenu>
        }
      </NavItem>
      {hasProjectId &&
        <>
          <NavItem>
            <NavLink
              to={`/${params.projectId}/planner`}
              $focusMenu={location.pathname !== '/' && location.pathname.slice(3) === 'planner'}
              $hasSubMenu={false}
              $hasProjectId={true}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              Planner
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={`/${params.projectId}/realtime`}
              $focusMenu={location.pathname !== '/' && location.pathname.slice(3) === 'realtime'}
              $hasSubMenu={false}
              $hasProjectId={true}
            >
              <FontAwesomeIcon icon={faMapLocationDot} />
              Realtime Location
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={`/${params.projectId}/history`}
              $focusMenu={location.pathname !== '/' && location.pathname.slice(3) === 'history'}
              $hasSubMenu={false}
              $hasProjectId={true}
            >
              <FontAwesomeIcon icon={faTable} />
              Location History
            </NavLink>
          </NavItem>
        </>
      }
    </Navbar>
  );
};