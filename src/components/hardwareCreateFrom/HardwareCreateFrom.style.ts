import { Button } from "@mui/material";
import styled from "styled-components";

export const ColorBoxButton = styled.button<{ addColor: string }>`
  height: 56px;
  width: 120px;
  border: 1px solid var(--grey300);
  border-radius: 5px;
  background-color: ${(props) => (props.addColor)};
`;

export const CancelButton = styled(Button)`
  background-color: var(--grey200) !important;
  &:hover {
    background-color: var(--grey300) !important;
  }
`;