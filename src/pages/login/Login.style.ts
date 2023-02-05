import styled from "styled-components";
import { maxLayout } from "../../utils/breakpoint";
import '../../theme/Theme.css';

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--grey400);
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media ${maxLayout.xs} {
    height: calc(100vh - 120px);
    padding-top: 120px;
    align-items: initial;
  }
`;

export const LogoWrapper = styled.div`
  position: absolute;
  left: 30px;
  top: 30px;

  @media ${maxLayout.xs} {
    left: 50%;
    transform: translate(-60%);
  }
`;

export const Title = styled.div`
  color: var(--primary);
  font-size: var(--large-heading-text);
  font-weight: bolder;
  text-align: center;
  margin: 20px auto;
`;