import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { authActions } from "reduxStore";
import { showToast, userLoginSchema } from "utils";
import { routes, local } from "common";
import "./userLogin.css";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    const result = await dispatch(authActions.loginUser(data)).unwrap();
    const isNutritionist = result?.user?.is_nutritionist ?? null;

    if (isNutritionist) {
      local.storeIsNutritionist(isNutritionist);
      navigate(routes.HOME_NUTRITIONIST);
    } else if (isNutritionist === false) {
      local.storeIsNutritionist(isNutritionist);
      navigate(routes.HOME_USER);
    } else if (isNutritionist === null && result?.access) {
      local.storeIsNutritionist(null);
      navigate(routes.RECIPES_ADMIN);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-form-container">
        <h2>Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={userLoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field type="text" name="username" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <div className="form-links">
                <div>
                  <span>Not registered yet?</span>
                  <Link to={routes.USER_SIGNUP} className="link-button">
                    Signup
                  </Link>
                </div>

                <Link to={routes.LANDING} className="link-button">
                  Back to Main
                </Link>
              </div>

              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserLogin;

