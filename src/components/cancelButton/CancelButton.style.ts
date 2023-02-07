import styled from "styled-components";
import { Button } from "@mui/material";
import '../../theme/Theme.css';

export const CancelButton = styled(Button)`
  background-color: var(--grey200) !important;
  &:hover {
    background-color: var(--grey300) !important;
  }
`;