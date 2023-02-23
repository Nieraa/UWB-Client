import {
  ImageAndTextWrapper,
  NavBrand
} from "./Logo.style";
import { LogoProps } from "../../types";

function Logo(props: LogoProps) {
  const { theme, size } = props;

  return (
    <NavBrand>
      <ImageAndTextWrapper
        to="/projects"
        theme={theme}
        size={size}
      >
        <img
          src={process.env.PUBLIC_URL + "/static/images/RTLS_UWB.png"}
          alt="ILS"
          height={size === "medium" ? 36 : 60}
        />
        I L S
      </ImageAndTextWrapper>
    </NavBrand>
  );
}

export default Logo;