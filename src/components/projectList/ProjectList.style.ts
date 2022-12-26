import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../theme/Theme.css';

export const ProjectWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const ProjectLink = styled(Link)`
  text-decoration: none;
`;

export const ProjectName = styled.div`
  font-size: var(--text);
  color: var(--black);
`;