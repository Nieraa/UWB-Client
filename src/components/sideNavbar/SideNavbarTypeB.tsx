import {
  Navbar,
  NavItem,
  NavLink,
  SubMenu,
  SubMenuLink,
  NodeListToggle,
  NodeSubMenu,
  NodeList,
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
  faPenToSquare,
  faPen,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Project, Node } from "../../types";

interface SideNavbarTypeBProps {
  projectId: string;
  roomPlanId: string;
  projects: Project[];
  anchors: Node[];
  setCurrentAnchor: (anchor: Node) => void;
  setOpenCreate: (openCreate: boolean) => void;
  setOpenUpdate: (openUpdate: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

function SideNavbarTypeB(props: SideNavbarTypeBProps) {
  const {
    projectId,
    roomPlanId,
    projects,
    anchors,
    setCurrentAnchor,
    setOpenCreate,
    setOpenUpdate,
    setOpenDelete
  } = props;

  const [collapseProjects, setCollapseProjects] = useState<boolean>(true);
  const [collapseAnchors, setCollapseAnchors] = useState<boolean>(true);

  const location = useLocation();

  const hasProjectsSubMenu: boolean = projects.length !== 0 ? true : false;
  const hasAnchorsSubMenu: boolean = anchors.length !== 0 ? true : false;

  function handleCollapse(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    collapse: boolean,
    setCollapse: (collapse: boolean) => void
  ): void {
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
    setOpenCreate(true);
  }

  function handleUpdate(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    anchor: Node
  ) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentAnchor(anchor);
    setOpenUpdate(true);
  }

  function handleDelete(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    anchor: Node
  ): void {
    e.preventDefault();
    e.stopPropagation();
    setCurrentAnchor(anchor);
    setOpenDelete(true);
  }

  return (
    <Navbar>
      <NavItem>
        <NavLink
          to="/projects"
          $focusMenu={projectId === ""}
          $hasSubMenu={hasProjectsSubMenu}
        >
          {hasProjectsSubMenu &&
            <FontAwesomeIcon
              icon={collapseProjects ? faCaretRight : faCaretDown}
              onClick={(e) => handleCollapse(e, collapseProjects, setCollapseProjects)}
            />
          }
          <FontAwesomeIcon icon={faFolderOpen} />
          Projects
        </NavLink>
        {hasProjectsSubMenu &&
          <SubMenu
            collapse={collapseProjects}
            length={projects.length}
          >
            {projects.map((project) =>
              <li key={project.id}>
                <SubMenuLink
                  to={`/projects/${project.id}/room-plans`}
                  $focusMenu={project.id === projectId}
                  onClick={() => {
                    setCollapseProjects(true);
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

      <NavItem>
        <NavLink
          to={`/projects/${projectId}/room-plans/${roomPlanId}/planner`}
          $focusMenu={location.pathname.slice(projectId.length + 43) === 'planner'}
          $hasSubMenu={false}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Planner
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          to={`/projects/${projectId}/room-plans/${roomPlanId}/realtime`}
          $focusMenu={location.pathname.slice(projectId.length + 43) === 'realtime'}
          $hasSubMenu={false}
        >
          <FontAwesomeIcon icon={faMapLocationDot} />
          Real-time Tracking
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          to={`/projects/${projectId}/room-plans/${roomPlanId}/history`}
          $focusMenu={location.pathname.slice(projectId.length + 43) === 'history'}
          $hasSubMenu={false}
        >
          <FontAwesomeIcon icon={faTable} />
          Location Log
        </NavLink>
      </NavItem>
      <NavItem>
        <NodeListToggle hasSubMenu={hasAnchorsSubMenu}>
          {hasAnchorsSubMenu &&
            <FontAwesomeIcon
              icon={collapseAnchors ? faCaretRight : faCaretDown}
              onClick={(e) => handleCollapse(e, collapseAnchors, setCollapseAnchors)}
            />
          }
          Anchors
          <FontAwesomeIcon
            icon={faPlus}
            onClick={handleAdd}
          />
        </NodeListToggle>
        {hasAnchorsSubMenu &&
          <NodeSubMenu
            collapse={collapseAnchors}
            length={anchors.length}
          >
            {anchors.map((anchor) =>
              <li key={anchor.id}>
                <NodeList>
                  {anchor.name.length > 14 ?
                    anchor.name.slice(0, 14) + "..."
                    :
                    anchor.name
                  }
                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={(e) => {
                      handleUpdate(e,anchor);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={(e) => {
                      handleDelete(e,anchor);
                    }}
                  />
                </NodeList>
              </li>
            )}
          </NodeSubMenu>
        }
      </NavItem>
    </Navbar >
  );
}

export default SideNavbarTypeB;