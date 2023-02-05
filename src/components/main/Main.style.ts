import { Link } from "react-router-dom";
import styled from "styled-components";
import { maxLayout, minLayout } from "../../../src/utils/breakpoint";
import '../../theme/Theme.css';

export const MainArea = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: var(--grey);
`;

export const BreadcrumbText = styled.span`
  font-size: var(--subheading-text);
  font-weight: bold;
  color: var(--primary);

  @media ${maxLayout.xxs} {
    font-size: var(--text);
  }
`;

export const BreadcrumbLink = styled(Link)`
  font-size: var(--subheading-text);
  color: var(--primary);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }

  @media ${maxLayout.xxs} {
    font-size: var(--text);
  }
`;

export const BreadcrumbsArea = styled.div`
  width: 100%;
  height: 27px;
  padding: 16px;
  border-bottom: 1px solid var(--grey100);
  font-size: var(--subheading-text);
  font-weight: bold;
  text-align: center;
  color: var(--primary);
  background-color: var(--white);
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