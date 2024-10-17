import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Paper, Container, Button } from "@mui/material";
import { profileActions, authActions, selectCurrentProfile } from "reduxStore";
import { blogApi } from "api";
import { Loader, ConfirmationDialog, ProfileSection } from "components";
import { BlogModal } from "modals";
import { useCustomInfiniteQuery } from "utils";
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
    refetch: refetchApprovedBlogs,
  } = useCustomInfiniteQuery({
    queryKey: ["approvedBlogs"],
    queryFn: ({ pageParam = 1 }) => blogApi.getNutritionistApprovedBlogs({ pageParam }),
  });
  const approvedBlogs = approvedBlogsData?.pages.flatMap((page) => page.results) ?? [];

  const {
    data: pendingBlogsData,
    fetchNextPage: fetchNextPendingPage,
    hasNextPage: hasNextPendingPage,
    isLoading: pendingBlogsLoading,
    refetch: refetchPendingBlogs,
  } = useCustomInfiniteQuery({
    queryKey: ["pendingBlogs"],
    queryFn: ({ pageParam = 1 }) => blogApi.getPendingBlogs({ pageParam }),
  });
  const pendingBlogs = pendingBlogsData?.pages.flatMap((page) => page.results) ?? [];

  const {
    data: rejectedBlogsData,
    fetchNextPage: fetchNextRejectedPage,
    hasNextPage: hasNextRejectedPage,
    isLoading: rejectedBlogsLoading,
    refetch: refetchRejectedBlogs,
  } = useCustomInfiniteQuery({
    queryKey: ["rejectedBlogs"],
    queryFn: ({ pageParam = 1 }) => blogApi.getRejectedBlogs({ pageParam }),
  });
  const rejectedBlogs = rejectedBlogsData?.pages.flatMap((page) => page.results) ?? [];
  const allBlogs = [...approvedBlogs, ...pendingBlogs, ...rejectedBlogs];

  const fetchNextPage = async () => {
    if (hasNextApprovedPage) await fetchNextApprovedPage();
    if (hasNextPendingPage) await fetchNextPendingPage();
    if (hasNextRejectedPage) await fetchNextRejectedPage();
  };

  const refetchBlogs = () => {
    refetchApprovedBlogs();
    refetchPendingBlogs();
    refetchRejectedBlogs();
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
      <ProfileSection
        isNutritionist={true}
        currentUser={currentUser}
        handleProfileEditClick={handleProfileEditClick}
        handleProfileDeleteClick={() => setIsDialogOpen(true)}
      />

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
              <BlogListCard key={index} blog={blog} username={currentUser.username} status={blog.status} refetchBlogs={refetchBlogs} />
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

      {isAddModalOpen && <BlogModal open={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} blog={null} refetchBlogs={refetchBlogs} />}
    </Container>
  );
};

export default Profile;

