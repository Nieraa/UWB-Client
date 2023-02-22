import styled from "styled-components";

export const ContentWrapper = styled.div`
  text-align: center;
`;

export const Title = styled.div<{ success: boolean }>`
  color: ${({success}) => success ? "var(--green)" : "var(--error)"};
  font-size: var(--sm-heading);
  font-weight: bold;
  margin-top: 20px;
`;

export const Detail = styled.div`
  font-size: var(--md-text);
  margin-top: 20px;
`;