import { Link } from "react-router-dom";
import styled from "styled-components";

export const ImageAndTextWrapper = styled(Link)<{ theme: string, size: string }>`
  color: ${({theme}) => (theme === "light" ? "var(--primary)" : "var(--grey)")};
  font-size: ${({size}) => (size === "medium" ? "var(--sm-heading)" : "var(--md-heading)")};
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: ${({theme}) => (theme === "light" ? "pointer" : "default")};

  img {
    margin-right: 22px;
  }
`;

export const NavBrand = styled.div`
  display: flex;
  align-items: center;
`;