import { Link } from "react-router-dom";
import styled from "styled-components";
import '../../theme/Theme.css';

export const ImageAndTextWrapper = styled(Link)<{ theme: string, size: string }>`
  img {
    margin-right: 22px;
  }
  color: ${({theme}) => (theme === "light" ? "var(--primary)" : "var(--grey)")};
  text-decoration: none;
  font-size: ${({size}) => (size === "medium" ? "var(--heading-text)" : "var(--large-heading-text)")};
  font-weight: bolder;
  display: flex;
  align-items: center;
`;

export const NavBrand = styled.div`
  display: flex;
  align-items: center;
`;