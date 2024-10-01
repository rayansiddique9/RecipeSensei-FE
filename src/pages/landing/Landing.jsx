import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { routes } from "common";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate(routes.USER_SIGNUP);
  };

  const handleLogin = () => {
    navigate(routes.LOGIN);
  };

  return (
    <Container className="landing-container">
      <Typography variant="h2" className="heading">
        Welcome to Recipe Sensei
      </Typography>

      <div className="button-container">
        <div>
          <Typography variant="h6" className="heading">
            New to the App?
          </Typography>
          <Button className="landing-button" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
        <div>
          <Typography variant="h6" className="heading">
            Already registered?
          </Typography>
          <Button className="landing-button" onClick={handleLogin}>
            Get Cooking
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Landing;

