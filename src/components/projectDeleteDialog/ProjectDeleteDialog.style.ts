import { Button } from "@mui/material";
import styled from "styled-components";

export const ContentWrapper = styled.div`
  text-align: center;
`;

export const Title = styled.div`
  color: var(--error);
  font-size: var(--heading-text);
  font-weight: 700;
  margin-top: 20px;
`;

export const Detail = styled.div`
  margin-top: 20px;
  font-size: var(--text);
`;

export const ProjectName = styled.span`
  color: var(--primary);
  font-weight: 700;
`;

export const CancelButton = styled(Button)`
  background-color: var(--grey200) !important;
  &:hover {
    background-color: var(--grey300) !important;
  }
`;

export const IconWrapper = styled.div`
  width: 110px;
  height: 110px;
  margin: 0 auto;
  border: 5px solid var(--error);
  border-radius: 50%;
`;