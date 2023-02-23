import styled from "styled-components";
import { Avatar } from "@mui/material";
import { maxLayout } from "../../../utils/breakpoint";

export const UserAvatar = styled(Avatar)`
  background-color: var(--primary) !important;
  margin-left: 19px;
  @media ${maxLayout.sm} {
    margin-left: 10px;
  }
`;

export const RightContent = styled.div`
  display: flex;
`;