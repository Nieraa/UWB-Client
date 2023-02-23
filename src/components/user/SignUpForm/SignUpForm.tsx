import { Button, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { sha512 } from "js-sha512";
import { SignUpData, SignUpFormProps } from "../../../types";
import { getUsernames, SignUp } from "../../../services/UsersService";

function SignUpForm(props: SignUpFormProps) {
  const { handleSignUp } = props;
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(6, "Username must be 6-10 characters.")
      .max(10, "Username must be 6-10 characters.")
      .matches(/^[a-z0-9]+$/, 'Username must be lowercases.')
      .required("Please enter username."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .matches(/[0-9]/, 'Password requires a number.')
      .matches(/[a-z]/, 'Password requires a lowercase letter.')
      .matches(/[A-Z]/, 'Password requires an uppercase letter.')
      .matches(/[^\w]/, 'Password requires a special character.')
      .required("Please enter password."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password not match.")
      .required("Password not match.")
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      const signUpData: SignUpData = {
        username: values.username,
        hashedPassword: sha512(values.password)
      };
      const existUsernames = await getUsernames();
      if (existUsernames.find((element) =>
        element.username === values.username
      )) {
        setErrorMessage("This username is taken. Please try another.")
      }
      else {
        setErrorMessage("")
        SignUp(signUpData, handleSignUp);
      }
    }
  });

  useEffect(() => {
    setErrorMessage("");
  }, [formik.values.username])

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        margin="dense"
        id="username"
        label="Username"
        name="username"
        variant="outlined"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.errors.username}
        fullWidth
      />
      {errorMessage &&
        <FormHelperText error={true}>
          {errorMessage}
        </FormHelperText>
      }
      <TextField
        margin="dense"
        id="password"
        type="password"
        label="Password"
        name="password"
        variant="outlined"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.errors.password}
        fullWidth
      />
      <TextField
        margin="dense"
        id="confirm-password"
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        variant="outlined"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.errors.confirmPassword}
        fullWidth
      />
      <Button
        sx={{ marginTop: "10px" }}
        variant="contained"
        type="submit"
        fullWidth
      >
        Sign up
      </Button>
    </form>
  );
}

export default SignUpForm;