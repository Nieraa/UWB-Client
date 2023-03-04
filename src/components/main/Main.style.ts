import { Link } from "react-router-dom";
import styled from "styled-components";
import { maxLayout } from "../../../src/utils/breakpoint";
import { DisplayFlexCenter } from "../../Styles/Styles.style";

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
  width: calc(100vw - 32px);
  height: 27px;
  background-color: var(--white);
  color: var(--primary);
  font-size: var(--sm-heading);
  font-weight: bold;
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid var(--grey100);
`;

export const SkeletonCanvas = styled.div`
  height: calc(100% - 60px);
  width: 100%;
  ${DisplayFlexCenter}
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
  z-index: 1;

  &:hover {
    background-color: var(--green100);
    transition: 0.2s;
  }
`;

export const PageName = styled.div`
  width: 250px;
  height: 60px;
  background-color: var(--link-visited);
  color: var(--white);
  font-size: var(--md-text);
  font-weight: bold;
  line-height: 60px;
  text-align: center;
  position: absolute;
  top: 70px;
  left: calc(50% - 125px);
  z-index: 1;
  border-radius: 10px;
`;