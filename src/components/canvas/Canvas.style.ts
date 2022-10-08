import styled, { css } from "styled-components";
import '../../theme/Theme.css';

export const AddElementButton = styled.button`
  width: 50px;
  height: 50px;
  color: var(--white);
  line-height: 50px;
  font-size: var(--subheading-text);
  text-align: center;
  position: absolute;
  border: 0px;
  border-radius: 50%;
  background-color: var(--light-green);
  position: absolute;
  bottom: 30px;
  right: 30px;

  &:hover {
    background-color: var(--light-green-hover);
    transition: 0.2s;
  }
`;