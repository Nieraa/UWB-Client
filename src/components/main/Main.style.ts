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

export const ProjectName = styled.div`
  width: 100%;
  height: 28px;
  padding: 16px;
  font-size: 21px;
  font-weight: bold;
  line-height: 28px;
  text-align: center;
  background-color: var(--primary-light);
  color: var(--primary);
`;