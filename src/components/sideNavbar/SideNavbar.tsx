import { Navbar, NavItem } from "./SideNavbar.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

// interface InnerItemProps {

// }

interface ItemProps {
  title: string;
  url: string;
  src: string;
  alt: string;
}

interface SideNavbarProps {
  items: ItemProps[];
}

export const SideNavbar = (props: SideNavbarProps) => {
  // const { items } = props;
  return (
    <Navbar>
      <NavItem href="" target="_blank" rel="noopener noreferrer" focusMenu={true}>
        <FontAwesomeIcon icon={faTable} />
        Position histories
      </NavItem>
      <NavItem href="" target="_blank" rel="noopener noreferrer" focusMenu={false}>
        <FontAwesomeIcon icon={faTable} />
        Position histories
      </NavItem>
      <NavItem href="" target="_blank" rel="noopener noreferrer" focusMenu={false}>
        <FontAwesomeIcon icon={faTable} />
        Position histories
      </NavItem>
    </Navbar>
  );
};