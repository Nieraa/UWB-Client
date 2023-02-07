import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { sha512 } from "js-sha512";

function UserCreateForm() {
  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("Please enter username."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .required("Please enter password."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), "Password not match"])
      .required("Password not match.")
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        userName: values.userName,
        password: sha512(values.password)
      }
    }
  });

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
        error={Boolean(formik.errors.confirmPassword)}
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

export default UserCreateForm;