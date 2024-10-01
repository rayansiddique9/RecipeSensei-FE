import React, { useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Paper, Container, Button } from "@mui/material";
import { profileActions, authActions, selectCurrentProfile } from "reduxStore";
import { blogApi } from "api";
import { Loader, ConfirmationDialog, BlogAddEdit } from "components";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BlogListCard from "./blogListCard/blogListCard";
import ProfileEditModal from "./profileEditModal/ProfileEditModal";
import InfiniteScroll from "react-infinite-scroll-component";
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentProfile) ?? [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { isPending: profileLoading } = useQuery({
    queryKey: ["nutritionistProfile"],
    queryFn: () => dispatch(profileActions.getNutritionistProfile()),
  });

  const {
    data: approvedBlogsData,
    fetchNextPage: fetchNextApprovedPage,
    hasNextPage: hasNextApprovedPage,
    isLoading: approvedBlogsLoading,
  } = useInfiniteQuery({
    queryKey: ["approvedBlogs"],
    queryFn: ({ pageParam = 1 }) => blogApi.getNutritionistApprovedBlogs({ pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.next ? new URL(lastPage.next) : null;
      return nextPageUrl ? nextPageUrl.searchParams.get("page") : null;
    },
  });
  const approvedBlogs = approvedBlogsData?.pages.flatMap((page) => page.results) ?? [];

  const {
    data: pendingBlogsData,
    fetchNextPage: fetchNextPendingPage,
    hasNextPage: hasNextPendingPage,
    isLoading: pendingBlogsLoading,
  } = useInfiniteQuery({
    queryKey: ["pendingBlogs"],
    queryFn: ({ pageParam = 1 }) => blogApi.getPendingBlogs({ pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.next ? new URL(lastPage.next) : null;
      return nextPageUrl ? nextPageUrl.searchParams.get("page") : null;
    },
  });
  const pendingBlogs = pendingBlogsData?.pages.flatMap((page) => page.results) ?? [];

  const {
    data: rejectedBlogsData,
    fetchNextPage: fetchNextRejectedPage,
    hasNextPage: hasNextRejectedPage,
    isLoading: rejectedBlogsLoading,
  } = useInfiniteQuery({
    queryKey: ["rejectedBlogs"],
    queryFn: ({ pageParam = 1 }) => blogApi.getRejectedBlogs({ pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.next ? new URL(lastPage.next) : null;
      return nextPageUrl ? nextPageUrl.searchParams.get("page") : null;
    },
  });
  const rejectedBlogs = rejectedBlogsData?.pages.flatMap((page) => page.results) ?? [];
  const allBlogs = [...approvedBlogs, ...pendingBlogs, ...rejectedBlogs];

  const fetchNextPage = async () => {
    if (hasNextApprovedPage) await fetchNextApprovedPage();
    if (hasNextPendingPage) await fetchNextPendingPage();
    if (hasNextRejectedPage) await fetchNextRejectedPage();
  };

  const handleProfileEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProfile = () => {
    dispatch(authActions.deleteUser(currentUser.username));
  };

  return profileLoading || approvedBlogsLoading || pendingBlogsLoading || rejectedBlogsLoading ? (
    <Loader />
  ) : (
    <Container className="nutritionist-profile-container">
      <Paper className="personal-info">
        <AccountBoxIcon className="account-box-icon"/>
        <Typography variant="h4" className="personal-info-heading">
          Personal Information
        </Typography>

        <div className="personal-info-row">
          <div className="personal-info-label-value">
            <Typography variant="body1" className="personal-info-label">
              <strong>Username:</strong> {currentUser.username}
            </Typography>
          </div>
          <div className="personal-info-label-value">
            <Typography variant="body1" className="personal-info-label">
              <strong>Qualification:</strong> {currentUser.qualification}
            </Typography>
          </div>
        </div>

        <div className="personal-info-row">
          <div className="personal-info-label-value">
            <Typography variant="body1" className="personal-info-label">
              <strong>Email:</strong> {currentUser.email}
            </Typography>
          </div>
          <div className="personal-info-label-value">
            <Typography variant="body1" className="personal-info-label">
              <strong>Years Of Experience:</strong> {currentUser.yearsOfExperience}
            </Typography>
          </div>
        </div>

        <Box className="personal-info-btns">
          <Button variant="outlined" className="profile-action-btn" onClick={handleProfileEditClick}>
            Edit
          </Button>
          <Button variant="outlined" className="profile-action-btn" color="error" onClick={() => setIsDialogOpen(true)}>
            Delete Account
          </Button>
        </Box>
      </Paper>

      <div className="add-blog-btn-container">
        <Typography className="blog-heading">
          All Blogs
        </Typography>
        <Button className="create-blog-btn" onClick={() => setIsAddModalOpen(true)}>
          Create Blog
        </Button>
      </div>

      <InfiniteScroll
        dataLength={allBlogs.length}
        next={fetchNextPage}
        hasMore={hasNextApprovedPage || hasNextPendingPage || hasNextRejectedPage}
        loader={
          <div className="progress-loader-wrapper">
            <Loader className="progress-loader" />
          </div>
        }
      >
        <Box className="profile-blogs-container">
          {allBlogs.length > 0 ? (
            allBlogs.map((blog, index) => (
              <BlogListCard key={index} blog={blog} username={currentUser.username} status={blog.status} />
            ))
          ) : (
            <div className="empty-message">No Blogs Available</div>
          )}
        </Box>
      </InfiniteScroll>

      {isModalOpen && <ProfileEditModal open={isModalOpen} handleClose={handleCloseModal} user={currentUser} />}

      {isDialogOpen && (
        <ConfirmationDialog
          open={isDialogOpen}
          description="Do you want to delete your profile?"
          handleClose={() => setIsDialogOpen(false)}
          handleConfirm={handleDeleteProfile}
        />
      )}

      {isAddModalOpen && <BlogAddEdit open={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} blog={null} />}
    </Container>
  );
};

export default Profile;

