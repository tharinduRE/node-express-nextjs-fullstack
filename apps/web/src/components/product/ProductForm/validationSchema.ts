import * as yup from "yup";

export const validationSchema = yup.object({
  first_name: yup
    .string()
    .required("First name required.")
    .matches(/^[A-Za-z]+$/, "Must be only alphabets")
    .min(6, "Must be minimum 6 characters")
    .max(10, "Must be less than 10 characters"),
  last_name: yup
    .string()
    .required("Last name required.")
    .matches(/^[A-Za-z]+$/, "Must be only alphabets")
    .min(6, "Must be minimum 6 characters")
    .max(10, "Must be less than 10 characters"),
  number: yup
    .string()
    .required("Phone Number required.")
    .matches(/^(?:7|0|(?:\+94))[0-9]{9,10}$/, "Must be a valid number"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});
