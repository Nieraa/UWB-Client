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

export const Project = styled.div`
  width: 100%;
  height: 250px;
  background-color: var(--white);
  border: 1px solid var(--grey100);
  border-radius: 10px;
`;

export const Row = styled.div`
  padding: 0 30px;
  display: flex;
`;

export const Column = styled.div`
  flex: 25%;
  padding: 10px;
  justify-content: center;
`;

export const MapArea = styled.div`
  width: 100%;
  height: 200px;
`;

export const ProjectName = styled.div`
  height: 50px;
  border-top: 1px solid var(--grey100);
  padding: 0 20px;
  font-weight: var(--text);
  line-height: 50px;
  color: var(--black);
`;