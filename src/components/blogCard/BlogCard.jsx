import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { local, routes } from "common";
import { blogApi } from "api";
import { ConfirmationDialog } from "components";
import "./blogCard.css";

const BlogCard = ({ blogDetails, refetch }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteBlog = async (event) => {
    event.stopPropagation();
    try {
      await blogApi.deleteBlog(blogDetails.id);
      setIsDialogOpen(false);
      refetch();
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

  const handleViewBlog = () => {
    navigate(routes.BLOG_DETAIL.replace(":id", blogDetails.id), { state: { blogDetails } });
  };

  return (
    <>
      <ListItem
        key={blogDetails.id}
        onClick={handleViewBlog}
        className="blog-list-item"
        secondaryAction={
          local.getIsNutritionist() === "null" && (
            <IconButton className="blog-del-btn" edge="end" aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          )
        }
      >
        <ListItemText className="blog-title" primary={blogDetails.title} />
      </ListItem>

      {isDialogOpen && (
        <ConfirmationDialog
          open={isDialogOpen}
          description="Do you want to delete this blog?"
          handleClose={handleCloseDialog}
          handleConfirm={deleteBlog}
        />
      )}
    </>
  );
};

export default BlogCard;

