import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { nutritionistSingupSchema } from "utils";
import { authActions } from "reduxStore";
import { routes } from "common";
import "./signup.css";

const Signup = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      user: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
      years_of_experience: values.yrsOfExperience,
      qualification: values.qualification,
    };
    await dispatch(authActions.signupNutritionist(data));
    setSubmitting(false);
  };

  return (
    <div className="nutritionist-signup-container">
      <h2 className="nutritionist-signup-title">NUTRITIONIST SIGNUP</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          yrsOfExperience: 1,
          qualification: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={nutritionistSingupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form-nutritionist">
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

            <div className="professional-details">
              <div className="form-group">
                <label htmlFor="yrsOfExperience">Years Of Experience</label>
                <Field type="number" name="yrsOfExperience" />
                <ErrorMessage name="yrsOfExperience" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="qualification">Qualification/Degree</label>
                <Field type="text" name="qualification" />
                <ErrorMessage name="qualification" component="div" className="error" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>

            <div className="form-links">
              <Link to={routes.USER_SIGNUP} className="link-button">
                Signup as User
              </Link>
              <div>
                <span>Already registered?</span>
                <Link to={routes.LOGIN} className="link-button">
                  Login
                </Link>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;

