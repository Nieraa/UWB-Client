import styled from "styled-components";
import '../../theme/Theme.css';
import { Link } from "react-router-dom";

export const ProjectWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px 0px;
`;

export const ProjectLink = styled(Link)`
  text-decoration: none;
`;

export const ProjectName = styled.div`
  font-size: var(--text);
  color: var(--black);
`;