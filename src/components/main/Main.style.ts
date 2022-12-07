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
  font-size: var(--subheading-text);
  font-weight: bold;
  line-height: 28px;
  text-align: center;
  background-color: var(--light-primary);
  color: var(--primary);
`;

export const Planner = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  background-color: var(--grey);
`;

export const AddElementButton = styled.button`
  width: 50px;
  height: 50px;
  z-index: 100;
  color: var(--white);
  line-height: 50px;
  font-size: var(--subheading-text);
  text-align: center;
  position: absolute;
  border: 0px;
  border-radius: 50%;
  background-color: var(--light-green);
  position: absolute;
  bottom: 30px;
  right: 30px;

  &:hover {
    background-color: var(--light-green-hover);
    transition: 0.2s;
  }
`;