import axios from "../axios";
import { SignInData, SignUpData, Username } from "../types";

export async function getUsernames(): Promise<Username[]> {
  return await axios
    .get("usernames")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return [];
    })
}

export async function SignIn(
  signInData: SignInData,
  handleSignIn: (success: boolean) => void
) {
  await axios
    .post("auth/signin", signInData)
    .then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", response.data.id);
      handleSignIn(true);
    })
    .catch(() => {
      handleSignIn(false);
    })
}

export async function SignUp(
  signUpData: SignUpData,
  handleSignUp: (success: boolean) => void
): Promise<void> {
  await axios
    .post("signup", signUpData)
    .then(() => {
      handleSignUp(true);
    })
    .catch(() => {
      handleSignUp(false);
    });
}