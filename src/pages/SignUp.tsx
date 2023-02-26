import {
  SignInAndUpBackground,
  SignInAndUpLogoWrapper,
  SignInAndUpTitle,
  ToSignInAndUpWrapper,
  LinkComponent
} from "../Styles/Styles.style";
import Logo from "../components/logo/Logo";
import SignUpForm from "../components/user/signUpForm/SignUpForm";
import ResponseDialog from "../components/responseDialog/ResponseDialog";
import {
  Card,
  CardContent
} from "@mui/material";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

function SignUp() {
  const [openResponse, setOpenResponse] = useState<boolean>(false);
  const [success, setSucccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();

  function handleSignUp(success: boolean): void {
    if (!success) {
      setSucccess(false);
      setTitle("Sign up failed");
      setDetail("Some error has ocrured while Sign up.");
    }
    else {
      setSucccess(true);
      setTitle("User created!!");
      setDetail("Congratulations, your account has been successfully created.");
    }
    setOpenResponse(true);
  }

  function handleClose(): void {
    setOpenResponse(false);
    navigate("/signin")
  }

  return (
    <>
      <SignInAndUpBackground>
        <SignInAndUpLogoWrapper>
          <Logo theme="dark" size="large" />
        </SignInAndUpLogoWrapper>
        <Card sx={{ maxWidth: 480 }}>
          <CardContent>
            <SignInAndUpTitle>
              Sign up
            </SignInAndUpTitle>
            <SignUpForm handleSignUp={handleSignUp} />
            <ToSignInAndUpWrapper>
              Already have an account?&nbsp;
              <LinkComponent to="/signin">
                Sign in
              </LinkComponent>
            </ToSignInAndUpWrapper>
          </CardContent>
        </Card>
      </SignInAndUpBackground>
      <ResponseDialog
        open={openResponse}
        success={success}
        title={title}
        detail={detail}
        handleClose={handleClose}
      />
    </>
  );
}

export default SignUp;