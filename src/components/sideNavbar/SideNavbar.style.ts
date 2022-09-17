import styled, { css } from "styled-components";
import { maxLayout, minLayout } from "../../utils/breakpoint";
import '../../theme/Theme.css';
import { Link } from "react-router-dom";

export const Navbar = styled.ul`
  width: 300px;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--grey100);
  border-bottom: 1px solid var(--grey100);
  background-color: white;
  overflow-x: hidden;
`;

export const NavItem = styled.li`
`;

export const NavLink = styled(Link) <{ focusMenu: boolean, hasSubMenu: boolean, hasProjectId: boolean }>`
  color: ${(props) => (props.focusMenu ? "var(--blue)" : "var(--black)")};
  background-color: ${(props) => (props.focusMenu ? "var(--grey50)" : "var(--white)")};
  text-decoration: none;
  height: 18px;
  padding: ${(props) => (props.hasSubMenu ? "16px 30px 16px 3px" : "16px 30px")};
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 24px;

  &:hover {
    background-color: var(--grey50);
    transition: all 0.2s;
  }

  svg {
    margin-right: 16px;
    width: 24px;
    color: var(--primary);
  }

  ${({ hasSubMenu }) =>
    hasSubMenu &&
    css`
        svg:first-child {
          margin-right: 0;
          width: 27px;
        }
      `}
  
  ${({ hasProjectId }) =>
    !hasProjectId &&
    css`
        svg:last-child {
          margin-left: auto;
          margin-right: 0;
          width: 13px;
        }
      `}
`;

export const SubMenuLink = styled(Link) <{ focusMenu: boolean }>`
  color: ${(props) => (props.focusMenu ? "var(--blue)" : "var(--black)")};
  background-color: ${(props) => (props.focusMenu ? "var(--grey50)" : "var(--white)")};
  text-decoration: none;
  height: 18px;
  padding: 16px 16px 16px 45px;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 24px;

  &:hover {
    background-color: var(--grey50);
    transition: all 0.2s;
  }

  svg {
    margin-right: 16px;
    width: 24px;
    color: var(--primary);
  }
`;

export const SubMenu = styled.ul<{ collapse: boolean, length: number }>`
  display: ${(props) => (props.collapse ? "none" : "block")};
  list-style: none;
  height: ${(props) => (props.length > 6 ? "300px" : "auto")};
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--grey100);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--grey200);
    border-radius: 15px;
    border: 4px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--grey300);
  }
`;