import styled, { css } from "styled-components";
import { maxLayout, minLayout } from "../../utils/breakpoint";

export const TopNavbar = styled.div`
  width: 100vw;
  height: 36px;
  position: fixed;
  padding: 12px 19px;
  background-color: white;
`;

export const NavBrand = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoWrapper = styled.a`
  img {
    margin-right: 22px;
  }
  color: #000000;
  text-decoration: none;
  font-size: 24px;
  font-weight: bolder;
  display: flex;
  align-items: center;
`;