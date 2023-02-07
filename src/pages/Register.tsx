import {
  SignInAndUpBackground,
  SignInAndUpLogoWrapper,
  SignInAndUpTitle,
  ToSignInAndUpWrapper,
  LinkComponent
} from "../Styles/Styles.style";
import Logo from "../components/logo/Logo";
import UserCreateForm from "../components/user/userCreateForm/UserCreateForm";
import {
  Card, 
  CardContent
} from "@mui/material";

function Register() {
  return (
    <SignInAndUpBackground>
      <SignInAndUpLogoWrapper>
        <Logo theme="dark" size="large" />
      </SignInAndUpLogoWrapper>
      <Card sx={{ maxWidth: 480, maxHeight: "calc(100vh - 120px)" }}>
        <CardContent>
          <SignInAndUpTitle>
            Sign up
          </SignInAndUpTitle>
          <UserCreateForm />
          <ToSignInAndUpWrapper>
            Already have an account?&nbsp;
            <LinkComponent to="/login">
              Sign in
            </LinkComponent>
          </ToSignInAndUpWrapper>
        </CardContent>
      </Card>
    </SignInAndUpBackground>
  );
}

export default Register;