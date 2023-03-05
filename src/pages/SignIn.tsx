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
import { SetOpenBackdropProps } from "../types";

function SignIn(props: SetOpenBackdropProps) {
  const { setOpenBackdrop } = props;

  return (
    <SignInAndUpBackground>
      <SignInAndUpLogoWrapper>
        <Logo theme="dark" size="large" />
      </SignInAndUpLogoWrapper>
      <Card sx={{ maxWidth: 480 }}>
        <CardContent>
          <SignInAndUpTitle>
            Sign in
          </SignInAndUpTitle>
          <SignInForm setOpenBackdrop={setOpenBackdrop}/>
          <ToSignInAndUpWrapper>
            Don't have an account?&nbsp;
            <LinkComponent to="/signup">
              Sign up
            </LinkComponent>
          </ToSignInAndUpWrapper>
        </CardContent>
      </Card>
    </SignInAndUpBackground>
  );
}

export default SignIn;