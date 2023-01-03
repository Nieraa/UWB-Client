import {
  Navbar,
  NavItem,
  NavLink,
  SubMenu,
  SubMenuLink,
  HardwareListToggle,
  HardwareSubMenu,
  HardwareList,
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
import {
  Params,
  useLocation,
  useParams
} from "react-router-dom";
import { useState } from "react";
import { Hardware, Project } from "../../types";

interface SideNavbarTypeBProps {
  projects: Project[];
  setAddType: (addType: string) => void;
  anchors: Hardware[];
  tags: Hardware[];
  setHardwareId: (hardwareId: string) => void;
  setHardwareType: (hardwareType: string) => void;
  setHardwareName: (hardwareName: string) => void;
  setHasColorDelete: (hasColorDelete: boolean) => void;
  setOpenDialog: (openDialog: boolean) => void;
  setOpenDelete: (openDelete: boolean) => void;
}

export const SideNavbarTypeB = (props: SideNavbarTypeBProps) => {
  const {
    projects,
    setAddType,
    anchors,
    tags,
    setHardwareId,
    setHardwareType,
    setHardwareName,
    setHasColorDelete,
    setOpenDialog,
    setOpenDelete
  } = props;

  const [collapseProjects, setCollapseProjects] = useState<boolean>(true);
  const [collapseAnchors, setCollapseAnchors] = useState<boolean>(true);
  const [collapseTags, setCollapseTags] = useState<boolean>(true);

  const params: Readonly<Params<string>> = useParams();
  const location = useLocation();

  const hasProjectId: boolean = params.projectId ? true : false;
  const hasProjectsSubMenu: boolean = projects.length > 0 ? true : false;
  const hasAnchorsSubMenu: boolean = anchors.length > 0 ? true : false;
  const hasTagsSubMenu: boolean = tags.length > 0 ? true : false;

  function handleCollapse(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    collapse: boolean,
    setCollapse: (collapse: boolean) => void): void {
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
    setOpenDialog(true);
  }

  function handleDelete(
    e: {
      preventDefault: () => void;
      stopPropagation: () => void;
    },
    hardwareId: string,
    hardwareType: string,
    hardwareName: string,
    color: string,
  ): void {
    e.preventDefault();
    e.stopPropagation();
    setHardwareId(hardwareId);
    setHardwareType(hardwareType);
    setHardwareName(hardwareName);
    if (hardwareType === "anchor") {
      const colorCount: number = anchors.filter(anchor => anchor.networkColor === color).length;
      if (colorCount === 1) {
        setHasColorDelete(true);
      }
      else {
        setHasColorDelete(false);
      }
    }
    else if (hardwareType === "tag") {
      const colorCount: number = tags.filter(tag => tag.networkColor === color).length;
      if (colorCount === 1) {
        setHasColorDelete(true);
      }
      else {
        setHasColorDelete(false);
      }
    }
    setOpenDelete(true);
  }

  return (
    <Navbar>
      <NavItem>
        <NavLink
          to="/"
          $focusMenu={location.pathname === '/'}
          $hasSubMenu={hasProjectsSubMenu}
          $hasProjectId={hasProjectId}
        >
          {hasProjectsSubMenu &&
            <FontAwesomeIcon
              icon={collapseProjects ? faCaretRight : faCaretDown}
              onClick={(e) => handleCollapse(e, collapseProjects, setCollapseProjects)}
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
        {hasProjectsSubMenu &&
          <SubMenu
            collapse={collapseProjects}
            length={projects.length}
          >
            {projects.map((project) =>
              <li key={project.id}>
                <SubMenuLink
                  to={`/${project.id}/planner`}
                  $focusMenu={hasProjectId && params.projectId === project.id ? true : false}
                  onClick={() => hasProjectId && params.projectId !== project.id && setCollapseProjects(true)}
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
      {params.projectId &&
        <>
          <NavItem>
            <NavLink
              to={`/${params.projectId}/planner`}
              $focusMenu={location.pathname !== '/' && location.pathname.slice(params.projectId.length + 2) === 'planner'}
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
              $focusMenu={location.pathname !== '/' && location.pathname.slice(params.projectId.length + 2) === 'realtime'}
              $hasSubMenu={false}
              $hasProjectId={true}
            >
              <FontAwesomeIcon icon={faMapLocationDot} />
              Realtime Tracking
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={`/${params.projectId}/history`}
              $focusMenu={location.pathname !== '/' && location.pathname.slice(params.projectId.length + 2) === 'history'}
              $hasSubMenu={false}
              $hasProjectId={true}
            >
              <FontAwesomeIcon icon={faTable} />
              Location Log
            </NavLink>
          </NavItem>
        </>
      }
      <NavItem>
        <HardwareListToggle hasSubMenu={hasAnchorsSubMenu}>
          {hasAnchorsSubMenu &&
            <FontAwesomeIcon
              icon={collapseAnchors ? faCaretRight : faCaretDown}
              onClick={(e) => handleCollapse(e, collapseAnchors, setCollapseAnchors)}
            />
          }
          Anchors
          <FontAwesomeIcon
            icon={faPlus}
            onClick={(e) => {
              handleAdd(e);
              setAddType("Anchor")
            }}
          />
        </HardwareListToggle>
        {hasAnchorsSubMenu &&
          <HardwareSubMenu
            collapse={collapseAnchors}
            length={anchors.length}
          >
            {anchors.map((anchor) =>
              <li key={anchor.id}>
                <HardwareList>
                  <FontAwesomeIcon icon={faFileLines} />
                  {anchor.name.length > 18 ?
                    anchor.name.slice(0, 18) + "..."
                    :
                    anchor.name
                  }
                  <FontAwesomeIcon
                    icon={faPen}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={(e) => {
                      handleDelete(
                        e,
                        anchor.id,
                        "anchor",
                        anchor.name,
                        anchor.networkColor
                      );
                    }}
                  />
                </HardwareList>
              </li>
            )}
          </HardwareSubMenu>
        }
      </NavItem>
      <NavItem>
        <HardwareListToggle hasSubMenu={hasTagsSubMenu}>
          {hasTagsSubMenu &&
            <FontAwesomeIcon
              icon={collapseTags ? faCaretRight : faCaretDown}
              onClick={(e) => handleCollapse(e, collapseTags, setCollapseTags)}
            />
          }
          Tags
          <FontAwesomeIcon
            icon={faPlus}
            onClick={(e) => {
              handleAdd(e);
              setAddType("Tag")
            }}
          />
        </HardwareListToggle>
        {hasTagsSubMenu &&
          <HardwareSubMenu
            collapse={collapseTags}
            length={tags.length}
          >
            {tags.map((tag) =>
              <li key={tag.id}>
                <HardwareList>
                  <FontAwesomeIcon icon={faFileLines} />
                  {tag.name.length > 18 ?
                    tag.name.slice(0, 18) + "..."
                    :
                    tag.name
                  }
                  <FontAwesomeIcon
                    icon={faPen}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={(e) => {
                      handleDelete(
                        e,
                        tag.id,
                        "tag",
                        tag.name,
                        tag.networkColor
                      );
                    }}
                  />
                </HardwareList>
              </li>
            )}
          </HardwareSubMenu>
        }
      </NavItem>
    </Navbar>
  );
};