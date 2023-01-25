import {
  TopNavbar,
  LogoWrapper,
  NavBrand
} from "./AppBar.style";

function AppBar() {
  return (
    <TopNavbar>
      <NavBrand>
        <LogoWrapper to="/">
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