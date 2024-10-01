import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { profileActions } from "reduxStore";
import { recipeApi } from "api";
import { Loader, RecipeCard, SearchBar, RecipeDetail, RecipeAddEdit } from "components";
import InfiniteScroll from "react-infinite-scroll-component";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeAddModalOpen, setRecipeAddModalOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: recipesLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["publicRecipes", searchQuery],
    queryFn: ({ pageParam = 1 }) => recipeApi.getNonPostedPublicRecipes({ pageParam, searchQuery }),
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.next ? new URL(lastPage.next) : null;
      return nextPageUrl ? parseInt(nextPageUrl.searchParams.get("page")) : undefined;
    },
  });

  const { isPending: profileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => dispatch(profileActions.getUserProfile()),
  });

  const recipes = data ? data.pages.flatMap((page) => page.results) : [];

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      refetch();
    },
    [refetch]
  );

  return recipesLoading || profileLoading ? (
    <Loader />
  ) : (
    <div className="posts">
      <div className="search-bar-container">
        <SearchBar placeHolder="Search recipes" onSearch={handleSearch} initialValue={searchQuery} />
      </div>
      <div className="add-btn-container">
        <Button variant="outlined" className="addRecipe-btn" onClick={() => setRecipeAddModalOpen(true)}>
          Add Recipe
        </Button>
      </div>
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
              recipes.map((recipe) => <RecipeCard key={recipe.id} recipeDetails={recipe} />)
            ) : (
              <div className="empty-message">No recipes found</div>
            )}
          </div>
        </InfiniteScroll>
      </div>

      {recipeAddModalOpen && (
        <RecipeAddEdit open={recipeAddModalOpen} handleClose={() => setRecipeAddModalOpen(false)} recipe={null} />
      )}
    </div>
  );
};

export default Home;

