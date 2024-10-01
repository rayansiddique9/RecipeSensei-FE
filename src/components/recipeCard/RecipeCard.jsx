import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { selectSavedRecipes } from "reduxStore";
import { recipeApi } from "api";
import { local, routes } from "common";
import { ConfirmationDialog } from "components";
import "./recipeCard.css";

const RecipeCard = ({ recipeDetails, onCardClick, updateSaveStatus }) => {
  const navigate = useNavigate();
  const savedRecipes = useSelector(selectSavedRecipes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isNutritionist = local.getIsNutritionist();

  const [isSaved, setIsSaved] = useState(
    savedRecipes && savedRecipes.some((savedRecipe) => savedRecipe.id === recipeDetails.id)
  );

  const handleSaveRecipe = async (event) => {
    event.stopPropagation();
    try {
      await recipeApi.saveRecipe(recipeDetails.id);
      setIsSaved(true);
    } catch (error) {}
  };

  const handleUnsaveRecipe = async (event) => {
    event.stopPropagation();
    try {
      await recipeApi.unsaveRecipe(recipeDetails.id);
      setIsSaved(false);
    } catch (error) {}
  };

  const deleteRecipe = async (event) => {
    event.stopPropagation();
    try {
      await recipeApi.deleteRecipe(recipeDetails.id);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {}
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (event) => {
    event.stopPropagation();
    setIsDialogOpen(false);
  };

  const handleViewRecipe = () => {
    navigate(`${routes.RECIPE_DETAIL}/${recipeDetails.id}`, { state: { recipeDetails } });
  };

  return (
    <Card className="card" onClick={handleViewRecipe}>
      <div>
        <div className="card-creator">
          <AccountCircleIcon />
          <span className="card__creator-name">{recipeDetails.creator}</span>
        </div>
      </div>
      <div className="card__body">
        <img src={recipeDetails.image} className="card__image" />
        <h2 className="card__title">{recipeDetails.title}</h2>
      </div>
      <div className="action-btn-container">
        {isNutritionist === "null" && (
          <Button variant="outlined" className="delete-btn" onClick={handleDelete}>
            <DeleteIcon className="delete-icon" />
          </Button>
        )}
        {isNutritionist === "false" && isSaved && (
          <Button className="bookmark-btn" variant="outlined"onClick={handleUnsaveRecipe}>
            <FavoriteIcon/>
          </Button>
        )}
        {isNutritionist === "false" && !isSaved && (
          <Button className="bookmark-btn" variant="outlined"onClick={handleSaveRecipe}>
            <FavoriteBorderIcon/>
          </Button>
        )}
      </div>
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

export default RecipeCard;

