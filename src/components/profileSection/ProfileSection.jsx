import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./profileSection.css";

const ProfileSection = ({
  isNutritionist,
  currentUser,
  postedRecipes,
  handleProfileEditClick,
  handleProfileDeleteClick,
}) => {
  return (
    <Paper className="personal-info">
      <AccountBoxIcon className="account-box-icon" />
      <Typography variant="h4" className="personal-info-heading">
        Personal Information
      </Typography>

      <div className="personal-info-row">
        <div className="personal-info-label-value">
          <Typography variant="body1" className="personal-info-label">
            <strong>Username:</strong> {currentUser.username}
          </Typography>
        </div>
        {isNutritionist && (
          <div className="personal-info-label-value">
            <Typography variant="body1" className="personal-info-label">
              <strong>Qualification:</strong> {currentUser.qualification}
            </Typography>
          </div>
        )}
      </div>

      <div className="personal-info-row">
        <div className="personal-info-label-value">
          <Typography variant="body1" className="personal-info-label">
            <strong>Email:</strong> {currentUser.email}
          </Typography>
        </div>
        {isNutritionist && (
          <div className="personal-info-label-value">
            <Typography variant="body1" className="personal-info-label">
              <strong>Years Of Experience:</strong> {currentUser.yearsOfExperience}
            </Typography>
          </div>
        )}
      </div>

      {!isNutritionist && (
        <Typography variant="body1">
          <strong>Recipes Posted:</strong> {postedRecipes.length}
        </Typography>
      )}

      <Box className="personal-info-btns">
        <Button variant="outlined" className="profile-action-btn" onClick={handleProfileEditClick}>
          Edit
        </Button>
        <Button variant="outlined" className="profile-action-btn" color="error" onClick={handleProfileDeleteClick}>
          Delete Account
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileSection;

