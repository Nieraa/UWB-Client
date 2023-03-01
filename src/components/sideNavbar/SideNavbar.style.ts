import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Tint = styled.div<{ collapseNavbar: boolean }>`
  height: calc(100vh - 60px);
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: ${({ collapseNavbar }) => (collapseNavbar ? "hidden" : "visible")};
  z-index: 2;
`;

export const Navbar = styled.ul<{ collapseNavbar: boolean }>`
  width: 300px;
  height: calc(100vh - 60px);
  background-color: var(--white);
  margin: 0;
  padding: 0;
  position: fixed;
  top: 60px;
  overflow-x: hidden;
  border-bottom: 1px solid var(--grey100);
  z-index: 3;
  transform: ${({ collapseNavbar }) => (collapseNavbar ? "translateX(-100%)" : "translateX(0)")};
  transition: all 0.2s ease-out;
`;

export const NavItem = styled.li`
`;

export const NavLink = styled(Link) <{ $focusMenu: boolean, $hasSubMenu: boolean }>`
  height: 18px;
  background-color: ${(props) => (props.$focusMenu ? "var(--grey50)" : "var(--white)")};
  color: ${(props) => (props.$focusMenu ? "var(--blue)" : "var(--black)")};
  text-decoration: none;
  line-height: var(--sm-heading);
  padding: ${(props) => (props.$hasSubMenu ? "16px 30px 16px 3px" : "16px 30px")};
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--grey50);
    transition: all 0.2s;
  }

  svg {
    width: 24px;
    color: var(--primary);
    margin-right: 16px;
  }

  ${({ $hasSubMenu }) =>
    $hasSubMenu &&
    css`
      svg:first-child {
        width: 27px;
        margin-right: 0;
      }
    `}
`;

export const SubMenuLink = styled(Link) <{ $focusMenu: boolean }>`
  height: 18px;
  background-color: ${(props) => (props.$focusMenu ? "var(--grey50)" : "var(--white)")};
  color: ${(props) => (props.$focusMenu ? "var(--blue)" : "var(--black)")};
  font-size: var(--md-text);
  text-decoration: none;
  line-height: var(--sm-heading);
  padding: 16px 16px 16px 45px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--grey50);
    transition: all 0.2s;
  }

  svg {
    width: 24px;
    color: var(--primary);
  }

  svg:nth-child(2) {
    margin-left: auto;
    margin-right: 10px;
  }

  svg:last-child {
    margin-right: 0px;
  }

  svg:first-child {
    margin-right: 16px;
  }
`;

export const SubMenu = styled.ul<{ collapse: boolean, length: number, hasBorder: boolean }>`
  height: ${(props) => (props.length > 6 ? "300px" : "auto")};
  font-size: var(--md-text);
  margin: 0;
  padding: 0;
  display: ${(props) => (props.collapse ? "none" : "block")};
  overflow-y: auto;
  border-bottom: ${(props) => (props.hasBorder ? "1px solid var(--grey100)" : "")};
  list-style: none;
`;

export const NodeListToggle = styled.div<{ hasSubMenu: boolean }>`
  height: 18px;
  background-color: var(--white);
  color: var(--black);
  text-decoration: none;
  line-height: var(--sm-heading);
  padding: ${(props) => (props.hasSubMenu ? "16px 30px 16px 3px" : "16px 30px")};
  display: flex;
  align-items: center;
  border-top: 1px solid var(--grey100);

  &:hover {
    background-color: var(--grey50);
    transition: all 0.2s;
  }

  svg {
    width: 24px;
    color: var(--primary);
    margin-right: 16px;
  }

  svg:last-child {
    width: 13px;
    margin-left: auto;
    margin-right: 0;
  }

  ${({ hasSubMenu }) =>
    hasSubMenu &&
    css`
        svg:first-child {
          width: 27px;
          margin-right: 5px;
          margin-left: 0;
        }
      `}
`;

export const NodeList = styled.div`
  height: 18px;
  background-color: var(--white);
  color: var(--black);
  font-size: var(--md-text);
  line-height: var(--sm-heading);
  padding: 16px 16px 16px 45px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--grey50);
    transition: all 0.2s;
  }

  svg {
    width: 24px;
    color: var(--primary);
    margin-right: 16px;
  }

  svg:first-child {
    margin-left: auto;
    margin-right: 10px;
  }

  svg:last-child {
    margin-right: 0px;
  }
`;

export const NodeSubMenu = styled.ul<{ collapse: boolean, length: number }>`
  height: ${(props) => (props.length > 6 ? "300px" : "auto")};
  font-size: var(--md-text);
  margin: 0;
  padding: 0;
  display: ${(props) => (props.collapse ? "none" : "block")};
  overflow-y: auto;
  list-style: none;
`;