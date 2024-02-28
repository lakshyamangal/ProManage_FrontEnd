import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const userUpdateSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  oldPassword: Yup.string().min(6).required("Please enter your password"),
  newPassword: Yup.string()
    .nullable()
    .min(6, "Password must be at least 6 characters long"),
});
