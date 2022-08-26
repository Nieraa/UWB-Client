import styled, { css } from "styled-components";
import { maxLayout, minLayout } from "../../utils/breakpoint";

export const Navbar = styled.div`
  width: 265px;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  border-top: 1px solid #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
  background-color: white;
  overflow-x: hidden;

  @media ${minLayout.xxl} {
    width: 300px;
  }
`;

export const NavItem = styled.a<{ focusMenu: boolean }>`
  color: black;
  background-color: ${({ focusMenu }) => (focusMenu ? "#EEEEEE" : "#FFFFFF")};
  text-decoration: none;
  height: 18px;
  padding: 16px;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 24px;

  &:hover {
    background-color: #EEEEEE;
    transition: all 0.2s;
  }

  svg {
    margin-right: 16px;
    width: 24px;
    color: #000000;
  }
`;

export const NavImage = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  align-content: center;
`;