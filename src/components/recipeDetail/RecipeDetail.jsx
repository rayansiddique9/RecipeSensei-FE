import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Paper, Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ContentSection } from "components";
import { local, routes } from "common";
import "./recipeDetail.css";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipeDetails } = location.state;

  if (!recipeDetails) return null;

  const handleNavigate = () => {
    if (local.getIsNutritionist() === "null") navigate(routes.RECIPES_ADMIN);
    else if (local.getIsNutritionist() === "false") navigate(routes.HOME_USER);
    else navigate(routes.HOME_NUTRITIONIST);
  };

  return (
    <Container className="modal-container">
      <Box className="back-button-container">
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleNavigate} className="back-button">
          Back
        </Button>
      </Box>
      <Box className="title">
        <Typography variant="h3" component="h1" textAlign="center" className="title-text">
          {recipeDetails.title}
        </Typography>
      </Box>

      <Box className="image-container">
        <img src={recipeDetails.image} alt={recipeDetails.title} className="modal-image" />
        <Box className="content-section">
          <ContentSection title="INGREDIENTS" content={recipeDetails.ingredients} />
          <ContentSection title="INSTRUCTIONS" content={recipeDetails.instructions} />
        </Box>
      </Box>

      <Paper elevation={0} className="paper-user-recipe">
        <Typography variant="subtitle1" component="span">
          Posted by:
        </Typography>
        <Typography variant="subtitle1" component="span" className="recipe-creator-name">
          {recipeDetails.creator}
        </Typography>
      </Paper>
    </Container>
  );
};

export default RecipeDetail;

