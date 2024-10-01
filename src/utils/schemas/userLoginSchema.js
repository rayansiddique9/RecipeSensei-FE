import { object, string } from "yup";
import { GLOBALS, CLAUSES } from "common";

const userLoginSchema = object().shape({
  username: string()
    .required(CLAUSES.USERNAME_REQUIRED),
  password: string()
    .required(CLAUSES.PASSWORD_REQUIRED),
});

export default userLoginSchema;

