import styled, { css } from "styled-components";
import { maxLayout, minLayout } from "../../utils/breakpoint";
import '../../theme/Theme.css';
import { Link } from "react-router-dom";

export const TopNavbar = styled.div`
  width: 100vw;
  height: 36px;
  position: fixed;
  padding: 12px 19px;
  background-color: var(--white);
`;

export const NavBrand = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoWrapper = styled(Link)`
  img {
    margin-right: 22px;
  }
  color: var(--primary);
  text-decoration: none;
  font-size: var(--heading-text);
  font-weight: bolder;
  display: flex;
  align-items: center;
`;