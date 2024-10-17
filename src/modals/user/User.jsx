import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./user.css";

const User = ({ open, onClose, userDetails }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-info-modal"
      aria-describedby="user-or-nutritionist-information"
    >
      <Box className="modal-content">
        <Box className="modal-header">
          <Typography variant="h6" component="h2">
            {userDetails.qualification ? "Nutritionist Info" : "User Info"}
          </Typography>
          <IconButton className="close-btn" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="modal-body">
          <Box className="info-row">
            <Typography variant="subtitle1" component="span" className="info-label">
              Username:
            </Typography>
            <Typography variant="body1" component="span" className="info-value">
              {userDetails.user.username}
            </Typography>
          </Box>
          <Box className="info-row">
            <Typography variant="subtitle1" component="span" className="info-label">
              Email:
            </Typography>
            <Typography variant="body1" component="span" className="info-value">
              {userDetails.user.email}
            </Typography>
          </Box>
          {userDetails.years_of_experience && (
            <Box className="info-row">
              <Typography variant="subtitle1" component="span" className="info-label">
                Years of Experience:
              </Typography>
              <Typography variant="body1" component="span" className="info-value">
                {userDetails.years_of_experience}
              </Typography>
            </Box>
          )}
          {userDetails.qualification && (
            <Box className="info-row">
              <Typography variant="subtitle1" component="span" className="info-label">
                Qualification:
              </Typography>
              <Typography variant="body1" component="span" className="info-value">
                {userDetails.qualification}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default User;

