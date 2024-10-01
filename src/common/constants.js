export const GLOBALS = {
  MIN_USERNAME_LENGTH: 4,
  MIN_PASSWORD_LENGTH: 8,
  MIN_QUALIFICAITON_LENGTH: 3,
  MIN_EXPERIENCE: 1,
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  IS_NUTRITIONIST: "is_nutritionist",
  PAGE_SIZE: 20,
};

export const CLAUSES = {
  USERNAME_REQUIRED: "Username is required.",
  USERNAME_LENGTH: `Username must be at least ${GLOBALS.MIN_USERNAME_LENGTH} characters.`,
  EMAIL_REQUIRED: "Email is required.",
  VALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_LENGTH: `Password must be at least ${GLOBALS.MIN_PASSWORD_LENGTH} characters.`,
  VALID_PASSWORD: "Password must contain at least one letter and one number.",
  CONFIRM_PASSWORD_MATCH: "Passwords do not match.",
  CONFIRM_PASSWORD_REQUIRED: "Please retype password to confirm.",
  VERIFICATION_EMAIL_SENT: "Verification email sent successfully.",
  EXPERIENCE_REQUIRED: "Years of experience is required.",
  QUALIFICATION_REQUIRED: "Qualification is required.",
  MINIMUM_EXPERIENCE: `Minimum experience of ${GLOBALS.MIN_EXPERIENCE} is required.`,
  VALID_QUALIFICATION: `Qualification must be atleast ${GLOBALS.MIN_QUALIFICAITON_LENGTH} characters.`,
};

