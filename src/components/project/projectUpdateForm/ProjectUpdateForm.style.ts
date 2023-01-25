import styled from "styled-components";
import { Button, FormHelperText } from "@mui/material";
import '../../../theme/Theme.css';

export const CancelButton = styled(Button)`
  background-color: var(--grey200) !important;
  &:hover {
    background-color: var(--grey300) !important;
  }
`;

export const ImageErrorHelperText = styled(FormHelperText)`
  color: var(--error) !important;
  margin: 3px 14px !important;
`;