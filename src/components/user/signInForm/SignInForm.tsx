import { Button, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sha512 } from "js-sha512";
import { SignIn } from "../../../services/UsersService";
import { salt } from "../../../salt"
import { SetOpenBackdropProps } from "../../../types";

function SignInForm(props: SetOpenBackdropProps) {
  const { setOpenBackdrop } = props;

  const [errorMessage, setErrormessage] = useState<string>("");

  const navigate = useNavigate();

  function handleSignIn(success: boolean): void {
    if (success) {
      setErrormessage("");
      navigate("/projects");
    }
    else {
      setErrormessage("Invalid username or password")
    }
    setOpenBackdrop(false);
  }

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Please enter username"),
    password: yup
      .string()
      .required("Please enter password."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setOpenBackdrop(true);
      const userData = {
        username: values.username,
        password: sha512(values.password + salt.value),
      }
      SignIn(userData, handleSignIn);
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {errorMessage &&
        <FormHelperText error={true}>
          {errorMessage}
        </FormHelperText>
      }
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
      <Button
        variant="contained"
        type="submit"
        sx={{ marginTop: "10px" }}
        fullWidth
      >
        Sign in
      </Button>
    </form>
  );
}

export default SignInForm;