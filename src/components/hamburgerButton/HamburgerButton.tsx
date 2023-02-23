import { OpenButton } from "./HamburgerButton.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface HamburgerButtonProps {
  handleCollapseNavbar: () => void;
}

function HamburgerButton(props: HamburgerButtonProps) {
  const { handleCollapseNavbar } = props;

  return (
    <OpenButton onClick={handleCollapseNavbar} type="button" aria-label="open-button">
      <FontAwesomeIcon icon={faBars}/>
    </OpenButton>
  );
}

export default HamburgerButton;