import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, Typography, Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ConfirmationDialog } from "components";
import { recipeApi } from "api";
import { routes } from "common";
import { updateSavedRecipes } from "reduxStore";
import { RecipeModal } from "modals";
import "./recipeListCard.css";

const RecipeListCard = ({ recipe, username, refetch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleEditClick = (event) => {
    event.stopPropagation();
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = (event) => {
    if (event) event.stopPropagation();
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const deleteRecipe = async (event) => {
    if (event) event.stopPropagation();
    try {
      await recipeApi.deleteRecipe(recipe.id);
      setIsDialogOpen(false);
      refetch();
    } catch (error) {}
  };

  const handleUnsaveRecipe = async (event) => {
    event.stopPropagation();
    try {
      await recipeApi.unsaveRecipe(recipe.id);
      dispatch(updateSavedRecipes(recipe.id));
    } catch (error) {}
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (event) => {
    if (event) event.stopPropagation();
    setIsDialogOpen(false);
  };

  const handleViewRecipe = () => {
    const recipeDetails = recipe;
    navigate(routes.RECIPE_DETAIL.replace(":id", recipeDetails.id), { state: { recipeDetails } });
  };

  return (
    <Card className="card-container" onClick={handleViewRecipe}>
      <CardMedia
        component="img"
        src={recipe.image}
        alt="Recipe Image"
        className="recipe-image"
      />

      <Box className="recipe-container">
        <Typography variant="h6" textAlign="center">
          {recipe.title}
        </Typography>

        {recipe.creator === username ? (
          <Box className="posted-recipe-actions">
            <Button variant="outlined" onClick={handleEditClick} className="edit-btn">
              <EditIcon className="edit-icon" />
            </Button>
            <Button variant="outlined" onClick={handleDelete} className="delete-btn">
              <DeleteIcon className="delete-icon" />
            </Button>
          </Box>
        ) : (
          <IconButton variant="outlined" className="unsave-btn" onClick={handleUnsaveRecipe}>
            <FavoriteIcon color="error" />
          </IconButton>
        )}
      </Box>
      {selectedRecipe && (
        <RecipeModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          recipe={selectedRecipe}
          stopPropagation={(e) => e.stopPropagation()}
          refetchRecipes={refetch}
        />
      )}

      {isDialogOpen && (
        <ConfirmationDialog
          open={isDialogOpen}
          description="Do you want to delete this recipe?"
          handleClose={handleCloseDialog}
          handleConfirm={deleteRecipe}
        />
      )}
    </Card>
  );
};

export default RecipeListCard;

