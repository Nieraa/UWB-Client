import { Background, LogoWrapper, Title } from "./Login.style";
import Logo from "../../components/logo/Logo";
import LoginForm from "../../components/user/loginForm/LoginForm";
import { Card, CardContent } from "@mui/material";

function Login() {
  return (
    <Background>
      <LogoWrapper>
        <Logo theme="dark" size="large"/>
      </LogoWrapper>
      <Card sx={{ maxWidth: 480, maxHeight: "calc(100vh - 120px)" }}>
        <CardContent>
          <Title>
            Sign in
          </Title>
          <LoginForm />
        </CardContent>
      </Card>
    </Background>
  );
}

export default Login;