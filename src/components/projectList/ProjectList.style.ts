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

export const ProjectName = styled.span`
  font-size: var(--text);
  color: var(--black);
`;

export const ProjectNameWrapper = styled.div`
  color: var(--black);
  font-size: var(--text);
  text-decoration: none;
  height: 18px;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 24px;

  svg {
    color: var(--primary);
    width: 13px;
  }
  
  svg:nth-last-child(2) {
    margin-left: auto;
    margin-right: 20px;
  }
`;