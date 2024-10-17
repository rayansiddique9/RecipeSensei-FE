import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { userSignupSchema, nutritionistSingupSchema } from "utils";
import { authActions } from "reduxStore";
import { routes } from "common";
import "./signup.css";

const Signup = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const [isNutritionist, setIsNutritionist] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const userDetails = {
      user: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    };

    if(isNutritionist) {
      userDetails.years_of_experience = values.yrsOfExperience,
      userDetails.qualification = values.qualification,
      await dispatch(authActions.signupNutritionist(userDetails));
    } else {
      await dispatch(authActions.signupUser(userDetails));
    }
    setSubmitting(false);
  };

  const initialValues = isNutritionist
    ? {
        username: "",
        email: "",
        yrsOfExperience: 1,
        qualification: "",
        password: "",
        confirmPassword: "",
      }
    : {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

  return (
    <div className="user-signup-container">
      <h2 className="user-signup-title">{isNutritionist ? "NUTRITIONIST SIGNUP" : "User Signup"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={isNutritionist ? nutritionistSingupSchema : userSignupSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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

            {isNutritionist && (
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
            )}

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
              <button type="button" onClick={() => setIsNutritionist(!isNutritionist)} className="link-button">
                Signup as {isNutritionist ? "User" : "Nutritionist"}
              </button>
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

