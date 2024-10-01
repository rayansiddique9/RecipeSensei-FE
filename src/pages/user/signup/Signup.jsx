import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { userSignupSchema } from "utils";
import { authActions } from "reduxStore";
import { routes } from "common";
import "./signup.css";

const Signup = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    const userDetails = {
      user: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    };
    await dispatch(authActions.signupUser(userDetails));
    setSubmitting(false);
  };

  return (
    <div className="user-signup-container">
      <h2 className="user-signup-title">User Signup</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={userSignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form-user">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <div className="form-links">
              <Link to={routes.NUTRITIONIST_SIGNUP} className="link-button">
                Signup as Nutritionist
              </Link>
              <div>
                <span>Already registered?</span>
                <Link to={routes.LOGIN} className="link-button">
                  Login
                </Link>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;

