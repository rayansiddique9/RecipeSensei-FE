import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { authActions, selectUserIsVerified } from "reduxStore";
import { routes } from "common";

const UserVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVerified = useSelector(selectUserIsVerified);
  const { token1, token2 } = useParams();

  if (!isVerified) {
    const params = {
      token1: token1,
      token2: token2,
    };
    dispatch(authActions.verifyUser(params))
      .unwrap()
      .then(() => navigate(routes.LOGIN))
      .catch(() => {});
  }

  return (
    <div className="auth-container">
      {!isVerified && (
        <div className="loading-screen">
          <h2>Verifying your email...</h2>
        </div>
      )}
    </div>
  );
};

export default UserVerification;

