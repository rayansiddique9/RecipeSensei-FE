import React, { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { recipeApi } from "api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader, SearchBar, RecipeCard } from "components";
import "./recipes.css";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: recipesLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["publicRecipes", searchQuery],
    queryFn: ({ pageParam = 1 }) => recipeApi.getPublicRecipes({ pageParam, searchQuery }),
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.next ? new URL(lastPage.next) : null;
      return nextPageUrl ? parseInt(nextPageUrl.searchParams.get("page")) : null;
    },
  });

  const recipes = data ? data.pages.flatMap((page) => page.results) : [];

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      refetch();
    },
    [refetch]
  );

  return recipesLoading ? (
    <Loader />
  ) : (
    <div className="recipes">
      <div className="search-bar-container">
        <SearchBar placeHolder="Search recipes" onSearch={handleSearch} initialValue={searchQuery} />
      </div>
      <div className="infinite-scroll-wrapper">
        <InfiniteScroll
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
              recipes.map((recipe, index) => <RecipeCard key={index} recipeDetails={recipe} />)
            ) : (
              <div className="empty-message">No recipes found</div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Recipes;

