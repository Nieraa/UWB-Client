import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../../theme/Theme.css";

export const ForgotPassword = styled.div`
  margin: 5px 0 10px;
  text-align: end;
`;

export const SignUp = styled.div`
  margin: 25px 0 15px;
  text-align: center;
`;

export const AuthLink = styled(Link)`
  color: var(--link);
  font-size: var(--text);
  text-decoration: none;

  &:visited {
    color: var(--link-visited);
  }
`;