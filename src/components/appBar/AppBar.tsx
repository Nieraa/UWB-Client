import HamburgerButton from "../hamburgerButton/HamburgerButton";
import {
  TopNavbar,
  LogoWrapper,
  NavBrand
} from "./AppBar.style";

interface AppBarProps {
  handleCollapseNavbar: () => void;
}

function AppBar(props: AppBarProps) {
  const { handleCollapseNavbar } = props;

  return (
    <TopNavbar>
      <HamburgerButton handleCollapseNavbar={handleCollapseNavbar} />
      <NavBrand>
        <LogoWrapper to="/projects">
          <img
            src={process.env.PUBLIC_URL + "/static/images/RTLS_UWB.png"}
            alt="ILS"
            height={36}
          />
          I L S
        </LogoWrapper>
      </NavBrand>
    </TopNavbar>
  );
}

export default AppBar;