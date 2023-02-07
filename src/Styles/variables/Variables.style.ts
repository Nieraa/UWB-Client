import { css } from "styled-components";
import Colors from "./Colors.style";
import FontSizes from "./FontSizes.style";

const Variables = css`
  :root {
    ${Colors}
    ${FontSizes}
  }
`;

export default Variables;