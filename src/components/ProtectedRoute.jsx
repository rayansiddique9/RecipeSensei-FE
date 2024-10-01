import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate, Routes } from "react-router-dom";
import { routes, local } from "common";
import Loader from "./Loader";
import Navbar from "./navbar/Navbar";
import { selectAccesstoken } from "reduxStore";

const ProtectedRoute = ({ element }) => {
  const accessToken = useSelector(selectAccesstoken);
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!local.getRefreshToken()) {
      navigate(routes.LOGIN);
    } else {
      setIsReady(true);
    }
  }, [accessToken, navigate]);

  return (
    <>
      {!isReady ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          {element}
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;

