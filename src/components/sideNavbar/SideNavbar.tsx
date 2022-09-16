import { Navbar, NavItem, NavLink, SubMenu } from "./SideNavbar.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faMapLocationDot, faFolderOpen, faFileLines, faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

interface ItemProps {
  id: string;
  title: string;
}

interface SideNavbarProps {
  items: ItemProps[];
}

export const SideNavbar = (props: SideNavbarProps) => {
  const { items } = props;
  const hasSubMenu = items.length > 0 ? true : false;
  const params = useParams();

  console.log(params);

  const [collapse, setCollapse] = useState(true);

  function handleCollapse(e: { preventDefault: () => void; stopPropagation: () => void; }) {
    setCollapse(!collapse);
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Navbar>
      <NavItem>
        <NavLink to="/" focusMenu={true} hasSubMenu={hasSubMenu}>
          {hasSubMenu ?
            <FontAwesomeIcon
              icon={collapse ? faCaretRight : faCaretDown}
              onClick={handleCollapse}
            />
            : <></>
          }
          <FontAwesomeIcon icon={faFolderOpen} />
          Projects
        </NavLink>
        {hasSubMenu &&
          <SubMenu collapse={collapse} length={items.length}>
            {items.map((item) =>
              <li key={item.id}>
                <NavLink to={`/${item.id}/planner`} focusMenu={false} hasSubMenu={false}>
                  <FontAwesomeIcon icon={faFileLines} />
                  {item.title}
                </NavLink>
              </li>
            )}
          </SubMenu>
        }
      </NavItem>
      {params.projectId && 
        <>
          <NavItem>
            <NavLink to={`/${params.projectId}/realtime`} focusMenu={false} hasSubMenu={false}>
              <FontAwesomeIcon icon={faMapLocationDot} />
              Realtime Location
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/${params.projectId}/history`} focusMenu={false} hasSubMenu={false}>
              <FontAwesomeIcon icon={faTable} />
              Location History
            </NavLink>
          </NavItem>
        </>
      }
    </Navbar>
  );
};