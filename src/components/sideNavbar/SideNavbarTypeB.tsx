import {
  Navbar,
  NavItem,
  NavLink,
  SubMenu,
  SubMenuLink,
  NodeListToggle,
  NodeSubMenu,
  NodeList,
  Tint,
} from "./SideNavbar.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faFolderOpen,
  faFileLines,
  faCaretRight,
  faCaretDown,
  faPlus,
  faPenToSquare,
  faPen,
  faTrashCan,
  faFolder
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Anchor, SideNavbarTypeBProps } from "../../types";
import { Tooltip } from "@mui/material";

function SideNavbarTypeB(props: SideNavbarTypeBProps) {
  const {
    collapseNavbar,
    projectId,
    roomPlanId,
    projects,
    anchors,
    setCurrentAnchor,
    setOpenCreate,
    setOpenUpdate,
    setOpenDelete,
    handleCloseNavbar
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
    anchor: Anchor
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
    anchor: Anchor
  ): void {
    e.preventDefault();
    e.stopPropagation();
    setCurrentAnchor(anchor);
    setOpenDelete(true);
  }

  return (
    <>
      <Tint onClick={handleCloseNavbar} collapseNavbar={collapseNavbar} />
      <Navbar collapseNavbar={collapseNavbar}>
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
            <FontAwesomeIcon icon={collapseProjects || !hasProjectsSubMenu ? faFolder : faFolderOpen} />
            Projects
          </NavLink>
          {hasProjectsSubMenu &&
            <SubMenu
              collapse={collapseProjects}
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
            $focusMenu={location.pathname.slice(projectId.length + 43) === "planner"}
            $hasSubMenu={false}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            Planner
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to={`/projects/${projectId}/room-plans/${roomPlanId}/realtime`}
            $focusMenu={location.pathname.slice(projectId.length + 43) === "realtime"}
            $hasSubMenu={false}
          >
            <FontAwesomeIcon icon={faMapLocationDot} />
            Real-time Tracking
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
            Anchors ({anchors.length})
            <Tooltip title="Create Anchor" arrow>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={handleAdd}
              />
            </Tooltip>
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
                    <Tooltip title="Edit Anchor" arrow>
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={(e) => {
                          handleUpdate(e, anchor);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Anchor" arrow>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={(e) => {
                          handleDelete(e, anchor);
                        }}
                      />
                    </Tooltip>
                  </NodeList>
                </li>
              )}
            </NodeSubMenu>
          }
        </NavItem>
      </Navbar>
    </>
  );
}

export default SideNavbarTypeB;