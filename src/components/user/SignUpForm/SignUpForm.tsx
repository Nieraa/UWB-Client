import { Button, FormHelperText, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { sha512 } from "js-sha512";
import { SignUpData, SignUpFormProps } from "../../../types";
import { getUsernames, SignUp } from "../../../services/UsersService";
import { salt } from "../../../salt";
import { PasswordHelperText } from "../../../Styles/Styles.style";

function SignUpForm(props: SignUpFormProps) {
  const { handleSignUp, setOpenBackdrop } = props;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isMoreThan8, setIsMoreThan8] = useState<boolean>(false);
  const [isHaveNumber, setIsHaveNumber] = useState<boolean>(false);
  const [isHaveLowerCase, setIsHaveLowerCase] = useState<boolean>(false);
  const [isHaveUpperCase, setIsHaveUpperCase] = useState<boolean>(false);
  const [isHaveSpecial, setIsHaveSpecial] = useState<boolean>(false);

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(4, "Username must be 4-12 characters.")
      .max(12, "Username must be 4-12 characters.")
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
      setOpenBackdrop(true);
      const signUpData: SignUpData = {
        username: values.username,
        hashedPassword: sha512(values.password + salt.value)
      };
      const existUsernames = await getUsernames();
      if (existUsernames.find((element) =>
        element.username === values.username
      )) {
        setErrorMessage("This username is taken. Please try another.");
        setOpenBackdrop(false);
      }
      else {
        setErrorMessage("");
        SignUp(signUpData, handleSignUp);
      }
    }
  });

  useEffect(() => {
    setErrorMessage("");
    if (formik.values.password.length >= 8) {
      setIsMoreThan8(true);
    }
    else {
      setIsMoreThan8(false);
    }
    if (formik.values.password.match(/[0-9]/)) {
      setIsHaveNumber(true);
    }
    else {
      setIsHaveNumber(false);
    }
    if (formik.values.password.match(/[a-z]/)) {
      setIsHaveLowerCase(true);
    }
    else {
      setIsHaveLowerCase(false);
    }
    if (formik.values.password.match(/[A-Z]/)) {
      setIsHaveUpperCase(true);
    }
    else {
      setIsHaveUpperCase(false);
    }
    if (formik.values.password.match(/[^\w]/)) {
      setIsHaveSpecial(true);
    }
    else {
      setIsHaveSpecial(false);
    }
  }, [formik.values.username, formik.values.password])

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
        fullWidth
      />
      <PasswordHelperText $isNotError={isMoreThan8}>
        <FontAwesomeIcon icon={isMoreThan8 ? faCheck : faTimes} />
        Password must be at least 8 characters.
      </PasswordHelperText>
      <PasswordHelperText $isNotError={isHaveNumber}>
        <FontAwesomeIcon icon={isHaveNumber ? faCheck : faTimes} />
        Password requires a number.
      </PasswordHelperText>
      <PasswordHelperText $isNotError={isHaveLowerCase}>
        <FontAwesomeIcon icon={isHaveLowerCase ? faCheck : faTimes} />
        Password requires a lowercase letter.
      </PasswordHelperText>
      <PasswordHelperText $isNotError={isHaveUpperCase}>
        <FontAwesomeIcon icon={isHaveUpperCase ? faCheck : faTimes} />
        Password requires an uppercase letter.
      </PasswordHelperText>
      <PasswordHelperText $isNotError={isHaveSpecial}>
        <FontAwesomeIcon icon={isHaveSpecial ? faCheck : faTimes} />
        Password requires a special character.
      </PasswordHelperText>
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