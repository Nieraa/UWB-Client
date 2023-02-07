import {
  SignInAndUpBackground,
  SignInAndUpLogoWrapper,
  SignInAndUpTitle,
} from "../Styles/Styles.style";
import Logo from "../components/logo/Logo";
import LoginForm from "../components/user/loginForm/LoginForm";
import {
  Card, 
  CardContent
} from "@mui/material";

function Login() {
  return (
    <SignInAndUpBackground>
      <SignInAndUpLogoWrapper>
        <Logo theme="dark" size="large"/>
      </SignInAndUpLogoWrapper>
      <Card sx={{ maxWidth: 480, maxHeight: "calc(100vh - 120px)" }}>
        <CardContent>
          <SignInAndUpTitle>
            Sign in
          </SignInAndUpTitle>
          <LoginForm />
        </CardContent>
      </Card>
    </SignInAndUpBackground>
  );
}

export default Login;