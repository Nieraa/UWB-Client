import { Navbar, NavItem, NavLink, SubMenu } from "./SideNavbar.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faMapLocationDot, faFolderOpen, faFileLines, faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface ItemProps {
  title: string;
  url: string;
}

interface SideNavbarProps {
  items: ItemProps[];
}

export const SideNavbar = (props: SideNavbarProps) => {
  const { items } = props;
  const hasSubMenu = items.length > 0 ? true : false;

  const [collapse, setCollapse] = useState(true);
  
  return (
    <Navbar>
      <NavItem>
        <NavLink href="" focusMenu={true} hasSubMenu={hasSubMenu}>
          {hasSubMenu ? 
            collapse ? 
              <FontAwesomeIcon icon={faCaretRight} onClick={() => setCollapse(!collapse)}/> 
              : <FontAwesomeIcon icon={faCaretDown} onClick={() => setCollapse(!collapse)}/> 
              : <></>
              }
          <FontAwesomeIcon icon={faFolderOpen} />
          Projects
        </NavLink>
        {hasSubMenu && 
          <SubMenu collapse={collapse} length={items.length}>
            {items.map((item) =>
              <li>
                <NavLink href={item.url} focusMenu={false} hasSubMenu={false}>
                  <FontAwesomeIcon icon={faFileLines} />
                  {item.title}
                </NavLink>
              </li>
            )}
          </SubMenu>
        }
      </NavItem>
      <NavItem>
        <NavLink href="#" focusMenu={false} hasSubMenu={false}>
          <FontAwesomeIcon icon={faMapLocationDot} />
          Realtime Location
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" focusMenu={false} hasSubMenu={false}>
          <FontAwesomeIcon icon={faTable} />
          Location History
        </NavLink>
      </NavItem>
    </Navbar>
  );
};