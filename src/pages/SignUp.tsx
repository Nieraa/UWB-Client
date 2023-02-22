import {
  SignInAndUpBackground,
  SignInAndUpLogoWrapper,
  SignInAndUpTitle,
  ToSignInAndUpWrapper,
  LinkComponent
} from "../Styles/Styles.style";
import Logo from "../components/logo/Logo";
import SignUpForm from "../components/user/SignUpForm/SignUpForm";
import {
  Card,
  CardContent
} from "@mui/material";
import SignUpDialog from "../components/user/SIgnUpDialog/SignUpDialog";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [openSignUpDialog, setOpenSignUpDialog] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  function handleClose(): void {
    setOpenSignUpDialog(false);
    navigate("/signin")
  }

  return (
    <>
      <SignInAndUpBackground>
        <SignInAndUpLogoWrapper>
          <Logo theme="dark" size="large" />
        </SignInAndUpLogoWrapper>
        <Card sx={{ maxWidth: 480, maxHeight: "calc(100vh - 120px)" }}>
          <CardContent>
            <SignInAndUpTitle>
              Sign up
            </SignInAndUpTitle>
            <SignUpForm setOpenSignUpDialog={setOpenSignUpDialog}/>
            <ToSignInAndUpWrapper>
              Already have an account?&nbsp;
              <LinkComponent to="/signin">
                Sign in
              </LinkComponent>
            </ToSignInAndUpWrapper>
          </CardContent>
        </Card>
      </SignInAndUpBackground>
      <SignUpDialog openSignUpDialog={openSignUpDialog} handleClose={handleClose}/>
    </>
  );
}

export default SignUp;