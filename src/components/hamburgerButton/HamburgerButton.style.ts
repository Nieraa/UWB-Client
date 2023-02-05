import styled from "styled-components";

export const OpenButton = styled.button`
  color: var(--primary);
  background-color: var(--white);

  &:hover {
    background-color: var(--grey50);
  }

  width: 36px;
  height: 36px;
  font-size: 20px;
  padding: 6px;
  margin-right: 19px;
  border: none;
  border-radius: 5px;
  transition: all 0.2s ease-out;
`;