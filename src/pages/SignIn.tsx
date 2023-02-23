import {
  LinkComponent,
  SignInAndUpBackground,
  SignInAndUpLogoWrapper,
  SignInAndUpTitle,
  ToSignInAndUpWrapper,
} from "../Styles/Styles.style";
import Logo from "../components/logo/Logo";
import SignInForm from "../components/user/signInForm/SignInForm";
import {
  Card,
  CardContent
} from "@mui/material";

function SignIn() {
  return (
    <SignInAndUpBackground>
      <SignInAndUpLogoWrapper>
        <Logo theme="dark" size="large" />
      </SignInAndUpLogoWrapper>
      <Card sx={{ maxWidth: 480, maxHeight: "calc(100vh - 120px)" }}>
        <CardContent>
          <SignInAndUpTitle>
            Sign in
          </SignInAndUpTitle>
          <SignInForm />
          <ToSignInAndUpWrapper>
            Don't have an account?&nbsp;
            <LinkComponent to="/signup">
              Sign Up
            </LinkComponent>
          </ToSignInAndUpWrapper>
        </CardContent>
      </Card>
    </SignInAndUpBackground>
  );
}

export default SignIn;