import styled from "styled-components";

export const OpenButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: var(--white);
  color: var(--primary);
  font-size: var(--lg-text);
  margin-right: 19px;
  padding: 6px;
  border: none;
  border-radius: 5px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: var(--grey50);
  }
`;