import {
  LeftContent,
  TopNavbar
} from "./AppBar.style";
import HamburgerButton from "../hamburgerButton/HamburgerButton";
import Logo from "../logo/Logo";
import { UserAction } from "../user/userAction/UserAction";

interface AppBarProps {
  handleCollapseNavbar: () => void;
}

function AppBar(props: AppBarProps) {
  const { handleCollapseNavbar } = props;

  return (
    <TopNavbar>
      <LeftContent>
        <HamburgerButton handleCollapseNavbar={handleCollapseNavbar} />
        <Logo theme="light" size="medium" />
      </LeftContent>
      <UserAction />
    </TopNavbar>
  );
}

export default AppBar;