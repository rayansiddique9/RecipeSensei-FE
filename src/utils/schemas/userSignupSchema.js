import { object, ref, string } from "yup";
import { GLOBALS, CLAUSES } from "common";

const userSignupSchema = object().shape({
  username: string()
    .required(CLAUSES.USERNAME_REQUIRED)
    .min(GLOBALS.MIN_USERNAME_LENGTH, CLAUSES.USERNAME_LENGTH),
  email: string().required(CLAUSES.EMAIL_REQUIRED).email(CLAUSES.VALID_EMAIL),
  password: string()
    .required(CLAUSES.PASSWORD_REQUIRED)
    .min(GLOBALS.MIN_PASSWORD_LENGTH, CLAUSES.PASSWORD_LENGTH)
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, CLAUSES.VALID_PASSWORD),
  confirmPassword: string()
    .required(CLAUSES.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref("password")], CLAUSES.CONFIRM_PASSWORD_MATCH),
});

export default userSignupSchema;

