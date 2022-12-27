import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../theme/Theme.css';

export const ProjectWrapper = styled.div`
  width: 100%;
  height: 100%;
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

export const ProjectLink = styled(Link)`
  text-decoration: none;
`;

export const ProjectName = styled.div`
  font-size: var(--text);
  color: var(--black);
`;