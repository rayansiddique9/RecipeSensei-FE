import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { profileActions } from "reduxStore";
import { recipeApi } from "api";
import { Loader, RecipeCard, SearchBar } from "components";
import { local } from "common";
import { RecipeModal } from "modals";
import { useCustomInfiniteQuery } from "utils";
import "./recipes.css";

const Home = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeAddModalOpen, setRecipeAddModalOpen] = useState(false);
  const isNutritionist = local.getIsNutritionist();

  const queryFn = ({ pageParam = 1 }) => {
    if (isNutritionist === "false") {
      return recipeApi.getNonPostedPublicRecipes({ pageParam, searchQuery });
    } else {
      return recipeApi.getPublicRecipes({ pageParam, searchQuery });
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: recipesLoading,
    refetch,
  } = useCustomInfiniteQuery({ queryKey: ["publicRecipes", searchQuery, isNutritionist], queryFn });

  const { isPending: profileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => dispatch(profileActions.getUserProfile()),
    enabled: isNutritionist === "false",
  });

  const recipes = data ? data.pages.flatMap((page) => page.results) : [];

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      refetch();
    },
    [refetch]
  );

  return recipesLoading || (isNutritionist === "false" && profileLoading) ? (
    <Loader />
  ) : (
    <div className="posts">
      <div className="search-bar-container">
        <SearchBar placeHolder="Search recipes" onSearch={handleSearch} initialValue={searchQuery} />
      </div>
      {isNutritionist === "false" && (
        <div className="add-btn-container">
          <Button variant="outlined" className="addRecipe-btn" onClick={() => setRecipeAddModalOpen(true)}>
            Add Recipe
          </Button>
        </div>
      )}
      <div className="scroll-wrapper-recipes">
        <InfiniteScroll
          className="infinity-scroll"
          dataLength={recipes.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="progress-loader-wrapper">
              <Loader className="progress-loader" />
            </div>
          }
        >
          <div className="wrapper">
            {recipes.length > 0 ? (
              recipes.map((recipe) => <RecipeCard key={recipe.id} recipeDetails={recipe} refetch={refetch} />)
            ) : (
              <div className="empty-message">No recipes found</div>
            )}
          </div>
        </InfiniteScroll>
      </div>

      {recipeAddModalOpen && (
        <RecipeModal open={recipeAddModalOpen} handleClose={() => setRecipeAddModalOpen(false)} recipe={null} />
      )}
    </div>
  );
};

export default Home;

