import HamburgerButton from "../hamburgerButton/HamburgerButton";
import Logo from "../logo/Logo";
import {
  TopNavbar,
} from "./AppBar.style";

interface AppBarProps {
  handleCollapseNavbar: () => void;
}

function AppBar(props: AppBarProps) {
  const { handleCollapseNavbar } = props;

  return (
    <TopNavbar>
      <HamburgerButton handleCollapseNavbar={handleCollapseNavbar} />
      <Logo theme="light" size="medium"/>
    </TopNavbar>
  );
}

export default AppBar;