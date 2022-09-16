import styled, { css } from "styled-components";
import { maxLayout, minLayout } from "../../utils/breakpoint";
import '../../theme/Theme.css';

export const MainArea = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 60px);
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: var(--grey);
`;