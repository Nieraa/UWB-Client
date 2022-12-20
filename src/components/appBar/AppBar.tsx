import {
  LogoWrapper,
  NavBrand,
  TopNavbar
} from "./AppBar.style";

export const AppBar = () => {
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
};