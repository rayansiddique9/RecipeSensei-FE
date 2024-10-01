import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { recipeApi } from "api";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import "./recipeGenerator.css";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerateRecipe = async () => {
    try {
      const params = { ingredients: ingredients };
      const response = await recipeApi.getAiRecipe(params);
      setResponse(response.recipe);
    } catch (error) {}
  };

  return (
    <Container className="ai-recipe-generator">
      <Typography variant="h4" align="center" gutterBottom className="ai-recipe-title">
        AI Recipe Generator
      </Typography>
      <Box component="form" className="box-recipe-generation">
        <TextField
          className="recipe-response"
          label="Generated Recipe"
          value={response}
          multiline
          fullWidth
          rows={10}
          disabled
        />
        <TextField
          className="ingredients-prompt"
          label="Enter Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          fullWidth
          multiline
          rows={7}
        />
        <Button
          variant="contained"
          className="generate-recipe-btn"
          onClick={handleGenerateRecipe}
          disabled={!ingredients.trim()}
        >
          Generate Recipe
        </Button>
      </Box>
    </Container>
  );
};

export default RecipeGenerator;
