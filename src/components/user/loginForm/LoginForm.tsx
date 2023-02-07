import { AuthLink, ForgotPassword, SignUp } from "./LoginForm.style";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { sha512 } from "js-sha512";

function LoginForm() {
  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("Please enter user name."),
    password: yup
      .string()
      .required("Please enter password."),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        userName: values.userName,
        password: sha512(values.password),
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        margin="dense"
        id="username"
        label="Username"
        name="userName"
        variant="outlined"
        value={formik.values.userName}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.userName)}
        helperText={formik.errors.userName}
        fullWidth
        autoFocus
      />
      <TextField
        margin="dense"
        id="password"
        type="password"
        label="Password"
        name="password"
        variant="outlined"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.password)}
        helperText={formik.errors.password}
        fullWidth
        autoFocus
      />
      <ForgotPassword>
        <AuthLink to="/change-password">
          Forgot Password?
        </AuthLink>
      </ForgotPassword>
      <Button
        variant="contained"
        type="submit"
        fullWidth
      >
        Login
      </Button>
      <SignUp>
        Don't have an account?&nbsp;
        <AuthLink to="/register">
          Sign Up
        </AuthLink>
      </SignUp>
    </form>
  );
}

export default LoginForm;