import styled from "styled-components";

export const ContentWrapper = styled.div`
  text-align: center;
`;

export const Title = styled.div`
  color: var(--error);
  font-size: var(--sm-heading);
  font-weight: bold;
  margin-top: 20px;
`;

export const Detail = styled.div`
  font-size: var(--md-text);
  margin-top: 20px;
`;

export const Name = styled.span`
  color: var(--primary);
  font-weight: bold;
`;

export const IconWrapper = styled.div`
  width: 110px;
  height: 110px;
  margin: 0 auto;
  border: 5px solid var(--error);
  border-radius: 50%;
`;