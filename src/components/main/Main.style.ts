import { Link } from "react-router-dom";
import styled from "styled-components";
import { maxLayout } from "../../../src/utils/breakpoint";

export const MainArea = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  background-color: var(--grey);
  position: fixed;
  bottom: 0;
  right: 0;
`;

export const BreadcrumbText = styled.span`
  color: var(--primary);
  font-size: var(--sm-heading);
  font-weight: bold;

  @media ${maxLayout.sm} {
    font-size: var(--md-text);
  }
`;

export const BreadcrumbLink = styled(Link)`
  color: var(--primary);
  font-size: var(--sm-heading);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media ${maxLayout.sm} {
    font-size: var(--md-text);
  }
`;

export const BreadcrumbsArea = styled.div`
  width: 100%;
  height: 27px;
  background-color: var(--white);
  color: var(--primary);
  font-size: var(--sm-heading);
  font-weight: bold;
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid var(--grey100);
`;

export const AddButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: var(--green);
  color: var(--white);
  font-size: var(--sm-heading);
  line-height: var(--lg-heading);
  text-align: center;
  position: absolute;
  bottom: 30px;
  right: 30px;
  border: 0px;
  border-radius: 50%;
  z-index: 100;

  &:hover {
    background-color: var(--green100);
    transition: 0.2s;
  }
`;