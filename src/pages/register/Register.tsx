import { AuthLink, Background, LogoWrapper, SignIn, Title } from "./Register.style";
import Logo from "../../components/logo/Logo";
import UserCreateForm from "../../components/user/userCreateForm/UserCreateForm";

import { Card, CardContent } from "@mui/material";

function Register() {
  return (
    <Background>
      <LogoWrapper>
        <Logo theme="dark" size="large" />
      </LogoWrapper>
      <Card sx={{ maxWidth: 480, maxHeight: "calc(100vh - 120px)" }}>
        <CardContent>
          <Title>
            Sign up
          </Title>
          <UserCreateForm />
          <SignIn>
            Already have an account?&nbsp;
            <AuthLink to="/login">
              Sign in
            </AuthLink>
          </SignIn>
        </CardContent>
      </Card>
    </Background>
  );
}

export default Register;