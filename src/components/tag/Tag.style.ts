import styled, { css } from "styled-components";
import '../../theme/Theme.css';

export const Element = styled.div`
  width: 40px;
  height: 40px;
  color: var(--white);
  line-height: 40px;
  font-size: var(--text);
  text-align: center;
  position: absolute;
  border-radius: 50%;
  background-color: var(--light-green);
`;

export const Text = styled.span<{ textWidth: number }>`
  color: var(--black);
  font-size: var(--text);
  font-weight: bold;
  line-height: 16px;
  text-align: center;
  position: absolute; 
  z-index: 100;
  left: ${(props) => (props.textWidth ? `calc(${-0.5 * props.textWidth + 20}px)` : "-50px")};
  top: -32px;
`;