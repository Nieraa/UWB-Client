import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../theme/Theme.css';

export const TopNavbar = styled.div`
  width: 100vw;
  height: 35px;
  position: fixed;
  padding: 12px 19px;
  background-color: var(--white);
  border-bottom: 1px solid var(--grey100);
  display: flex;
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

export const NavBrand = styled.div`
  display: flex;
  align-items: center;
`;