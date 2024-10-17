import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Paper, Container, Modal, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ContentSection } from "components";
import { blogApi } from "api";
import { local, routes } from "common";
import "./blogDetail.css";

const BlogDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { blogDetails } = location.state;

  if (!blogDetails) return null;

  const handleApproval = async (event) => {
    event.stopPropagation();
    try {
      await blogApi.updateStatus({ status: "APPROVED" }, blogDetails.id);
      handleNavigate();
    } catch (error) {}
  };

  const handleRejection = async (event) => {
    event.stopPropagation();
    try {
      await blogApi.updateStatus({ status: "REJECTED" }, blogDetails.id);
      handleNavigate();
    } catch (error) {}
  };

  const handleNavigate = () => {
    if (local.getIsNutritionist() === "null") navigate(routes.BLOGS_ADMIN);
    else if (local.getIsNutritionist() === "false") navigate(routes.BLOGS_USER);
    else navigate(routes.NUTRITIONIST_PROFILE);
  };

  return (
    <Container className="page-container">
      <Box className="back-button-container">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleNavigate}
          className="back-button"
        >
          Back
        </Button>
      </Box>

      <ContentSection title="TITLE" content={blogDetails.title} />
      <ContentSection title="CONTENT" content={blogDetails.content} />

      <div className="container-user-paper">
        <Paper elevation={0} className="paper-user">
          <div>
            <Typography variant="subtitle1" component="span">
              Posted by:
            </Typography>
            <Typography variant="subtitle1" component="span" className="posted-by">
              {blogDetails.nutritionist.user.username}
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle1" component="span">
              Email:
            </Typography>
            <Typography variant="subtitle1" component="span" className="posted-by">
              {blogDetails.nutritionist.user.email}
            </Typography>
          </div>
        </Paper>
      </div>
      <div className="status-btn-container">
        {local.getIsNutritionist() === "null" && blogDetails.status === "Pending" && (
          <Button variant="contained" className="status-update-btn" onClick={handleApproval}>
            Approve
          </Button>
        )}
        {local.getIsNutritionist() === "null" && blogDetails.status === "Approved" && (
          <Button variant="contained" color="error" className="status-update-btn" onClick={handleRejection}>
            Reject
          </Button>
        )}
      </div>
    </Container>
  );
};

export default BlogDetail;

