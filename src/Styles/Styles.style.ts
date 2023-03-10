import styled, { css, createGlobalStyle } from "styled-components";
import Variables from "./variables/Variables.style";
import { Button, FormHelperText } from "@mui/material";
import { Link } from "react-router-dom";
import { maxLayout } from "../utils/breakpoint";

const GlobalStyle = createGlobalStyle`
  ${css`
    ${Variables}

    ::-webkit-scrollbar {
      width: 15px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--grey200);
      background-clip: content-box;
      border: 4px solid transparent;
      border-radius: 15px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--grey300);
    }
  `};
`;

export const DisplayFlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignInAndUpBackground = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 700px;
  background-color: var(--grey400);
  ${DisplayFlexCenter}
  overflow-y: auto;
  
  @media ${maxLayout.xs} {
    height: calc(100vh - 120px);
    padding-top: 120px;
    align-items: initial;
  }
`;

export const SignInAndUpLogoWrapper = styled.div`
  position: absolute;
  left: 30px;
  top: 30px;

  @media ${maxLayout.xs} {
    left: 50%;
    transform: translate(-60%);
  }
`;

export const SignInAndUpTitle = styled.div`
  color: var(--primary);
  font-size: var(--md-heading);
  font-weight: bold;
  text-align: center;
  margin: 20px auto;
`;

export const ForgotPassword = styled.div`
  text-align: end;
  margin: 5px 0 10px;
`;

export const ToSignInAndUpWrapper = styled.div`
  text-align: center;
  margin: 25px 0 15px;
`;

export const LinkComponent = styled(Link)`
  color: var(--link);
  font-size: var(--md-text);
  text-decoration: none;

  &:visited {
    color: var(--link-visited);
  }
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const ListElementLink = styled(Link)`
  text-decoration: none;
`;

export const ListElementName = styled.span`
  color: var(--black);
  font-size: var(--md-text);
`;

export const ListElementNameWrapper = styled.div`
  height: 18px;
  color: var(--black);
  font-size: var(--md-text);
  text-decoration: none;
  line-height: var(--sm-heading);
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    color: var(--primary);
  }
  
  svg:nth-last-child(2) {
    margin-left: auto;
    margin-right: 10px;
  }
`;

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

export const PasswordHelperText = styled(FormHelperText)<{ $isNotError: boolean }>`
  color: ${({$isNotError}) => $isNotError ? "var(--green)" : "var(--error)"} !important;
  padding: 0 14px;
  svg {
    margin-right: 5px;
  }
`;

export const NodeElement = styled.div<{ nodeType: string }>`
  width: 40px;
  height: 40px;
  color: var(--white);
  font-size: var(--md-text);
  line-height: var(--md-heading);
  text-align: center;
  position: absolute;
  
  ${({ nodeType }) =>
    nodeType === "anchor" ?
      css`
        background-color: var(--red);
        border-radius: 50%;
      `
      :
      css`
        background-color: var(--green);
        border-radius: 20%;
      `
  }
`;

export const NodeText = styled.span<{ textWidth: number }>`
  color: var(--white);
  font-size: var(--md-text);
  font-weight: bold;
  text-shadow: -1px -1px 0 var(--black), 1px -1px 0 var(--black), -1px 1px 0 var(--black), 1px 1px 0 var(--black);
  line-height: var(--md-text);
  text-align: center;
  position: absolute;
  left: ${(props) => (props.textWidth ? `calc(${-0.5 * props.textWidth + 20}px)` : "-50px")};
  top: -32px; 
  z-index: 1;
`;

export default GlobalStyle;