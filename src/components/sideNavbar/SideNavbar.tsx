import {
  Navbar,
  NavItem,
  NavLink,
  SubMenu,
  SubMenuLink
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
  Dispatch,
  SetStateAction,
  useState
} from "react";
import {
  Params,
  useLocation,
  useParams
} from "react-router-dom";
import { Project } from "../../types";

interface SideNavbarProps {
  projects: Project[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SideNavbar = (props: SideNavbarProps) => {
  const { projects, setOpen } = props;

  const hasSubMenu: boolean = projects.length > 0 ? true : false;
  const params: Readonly<Params<string>> = useParams();
  const location = useLocation();

  const hasProjectId: boolean = params.projectId ? true : false;

  const [collapse, setCollapse] = useState(true);

  function handleCollapse(e: { preventDefault: () => void; stopPropagation: () => void; }) {
    setCollapse(!collapse);
    e.preventDefault();
    e.stopPropagation();
  }

  function handleAdd(e: { preventDefault: () => void; stopPropagation: () => void; }) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }

  return (
    <Navbar>
      <NavItem>
        <NavLink
          to="/"
          focusMenu={location.pathname === '/'}
          hasSubMenu={hasSubMenu}
          hasProjectId={hasProjectId}
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
                  focusMenu={hasProjectId && params.projectId === project.id ? true : false}
                  onClick={() => hasProjectId && params.projectId !== project.id && setCollapse(true)}
                >
                  <FontAwesomeIcon icon={faFileLines} />
                  {project.projectName}
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
              focusMenu={location.pathname !== '/' && location.pathname.slice(3) === 'planner'}
              hasSubMenu={false}
              hasProjectId={true}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              Planner
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={`/${params.projectId}/realtime`}
              focusMenu={location.pathname !== '/' && location.pathname.slice(3) === 'realtime'}
              hasSubMenu={false}
              hasProjectId={true}
            >
              <FontAwesomeIcon icon={faMapLocationDot} />
              Realtime Location
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={`/${params.projectId}/history`}
              focusMenu={location.pathname !== '/' && location.pathname.slice(3) === 'history'}
              hasSubMenu={false}
              hasProjectId={true}
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