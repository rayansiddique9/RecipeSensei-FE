import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Typography, Paper, Container, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { selectSavedRecipes, profileActions, authActions, selectCurrentProfile } from "reduxStore";
import { recipeApi } from "api";
import { Loader, ConfirmationDialog } from "components";
import RecipeListCard from "./recipeListCard/recipeListCard";
import ProfileEditModal from "./profileEditModal/ProfileEditModal";
import "./userProfile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const savedRecipes = useSelector(selectSavedRecipes) ?? [];
  const currentUser = useSelector(selectCurrentProfile) ?? [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { isPending: profileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => dispatch(profileActions.getUserProfile()),
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: recipesLoading,
  } = useInfiniteQuery({
    queryKey: ["postedRecipes"],
    queryFn: ({ pageParam = 1 }) => recipeApi.getPostedRecipes(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.next ? new URL(lastPage.next) : null;
      return nextPageUrl ? nextPageUrl.searchParams.get("page") : null;
    },
  });

  const postedRecipes = data?.pages.flatMap((page) => page.results) ?? [];

  const handleProfileEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProfile = () => {
    dispatch(authActions.deleteUser(currentUser.username));
  };

  return profileLoading || recipesLoading ? (
    <Loader />
  ) : (
    <Container className="user-prof-page">
      <Paper className="personal-info-user">
        <AccountBoxIcon className="account-box-icon"/>
        <Typography variant="h4" className="personal-info-heading-user">
          Personal Information
        </Typography>
        <Typography variant="body1">
          <strong>Username:</strong> {currentUser.username}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {currentUser.email}
        </Typography>

        <Typography variant="body1">
          <strong>Recipes Posted:</strong> {postedRecipes.length}
        </Typography>
        <Box className="personal-info-btns-user">
          <Button variant="outlined" className="profile-action-btn" onClick={handleProfileEditClick}>
            Edit
          </Button>
          <Button variant="outlined" className="profile-action-btn" color="error" onClick={() => setIsDialogOpen(true)}>
            Delete Account
          </Button>
        </Box>
      </Paper>

      <Box className="listingGrid">
        <Box className="recipe-box">
          <Typography variant="h4" className="recipe-heading">
            Posted Recipes
          </Typography>
          <InfiniteScroll
            dataLength={postedRecipes.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage && !isFetchingNextPage}
            loader={
              <div className="progress-loader-wrapper">
                <Loader className="progress-loader" />
              </div>
            }
          >
            {postedRecipes.length > 0 ? (
              postedRecipes.map((recipe, index) => (
                <RecipeListCard key={index} recipe={recipe} username={currentUser.username} />
              ))
            ) : (
              <div className="empty-message">No Recipes Posted Yet</div>
            )}
          </InfiniteScroll>
        </Box>

        <Box className="recipe-box">
          <Typography variant="h4" className="recipe-heading">
            Favourites
          </Typography>
          {savedRecipes.length > 0 ? (
            savedRecipes.map((recipe, index) => (
              <RecipeListCard key={index} recipe={recipe} username={currentUser.username} />
            ))
          ) : (
            <div className="empty-message">No Recipes Saved Yet</div>
          )}
        </Box>
      </Box>

      {isModalOpen && <ProfileEditModal open={isModalOpen} handleClose={handleCloseModal} user={currentUser} />}

      {isDialogOpen && (
        <ConfirmationDialog
          open={isDialogOpen}
          description="Do you want to delete your profile?"
          handleClose={() => setIsDialogOpen(false)}
          handleConfirm={handleDeleteProfile}
        />
      )}
    </Container>
  );
};

export default Profile;

