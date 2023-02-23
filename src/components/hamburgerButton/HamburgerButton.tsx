import { OpenButton } from "./HamburgerButton.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { CollapseNavbarProps } from "../../types";

function HamburgerButton(props: CollapseNavbarProps) {
  const { handleCollapseNavbar } = props;

  return (
    <OpenButton onClick={handleCollapseNavbar} type="button" aria-label="open-button">
      <FontAwesomeIcon icon={faBars}/>
    </OpenButton>
  );
}

export default HamburgerButton;