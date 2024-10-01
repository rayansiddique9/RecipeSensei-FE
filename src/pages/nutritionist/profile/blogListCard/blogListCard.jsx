import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { BlogAddEdit, ConfirmationDialog } from "components";
import { blogApi } from "api";
import { routes } from "common";
import "./blogListCard.css";

const BlogListCard = ({ blog }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEditClick = (event) => {
    event.stopPropagation();
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = (event) => {
    if (event) event.stopPropagation();
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const deleteBlog = async (event) => {
    if (event) event.stopPropagation();
    try {
      await blogApi.deleteBlog(blog.id);
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
    if (event) event.stopPropagation();
    setIsDialogOpen(false);
  };

  const handleViewBlog = () => {
    const blogDetails = blog;
    navigate(`${routes.BLOG_DETAIL}/${blog.id}`, { state: { blogDetails } });
  };

  return (
    <Card className="blog-main-container" onClick={handleViewBlog}>
      <Box className="blog-container">
        <Typography variant="h6" textAlign="center">
          {blog.title}
        </Typography>

        <Box className="posted-blog-actions">
          <Box className={`blog-status-${blog.status}`}>
            {blog.status}
          </Box>
          <Button variant="outlined" onClick={handleEditClick} className="edit-btn">
            <EditIcon className="edit-icon" />
          </Button>
          <Button variant="outlined" onClick={handleDelete} className="delete-btn">
            <DeleteIcon className="delete-icon" />
          </Button>
        </Box>
      </Box>
      {selectedBlog && (
        <BlogAddEdit
          open={isModalOpen}
          handleClose={handleCloseModal}
          blog={selectedBlog}
          stopPropagation={(e) => e.stopPropagation()}
        />
      )}

      {isDialogOpen && (
        <ConfirmationDialog
          open={isDialogOpen}
          description="Do you want to delete this blog?"
          handleClose={handleCloseDialog}
          handleConfirm={deleteBlog}
        />
      )}
    </Card>
  );
};

export default BlogListCard;

