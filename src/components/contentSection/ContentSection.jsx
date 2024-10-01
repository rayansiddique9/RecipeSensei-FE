import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import "./contentSection.css";

const ContentSection = ({ title, content }) => {

  const formatContent = (text) => {
    return text.split("\n").map((line, index) => (
      <Typography key={index} variant="body1" component="div">
        {line}
      </Typography>
    ));
  };

  return (
    <Box className="container">
      <Box className="title">
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </Box>

      <Paper elevation={3} square={false} className="paper-content">
        <Box className="content-box">
          {formatContent(content)}
        </Box>
      </Paper>
    </Box>
  );
};

export default ContentSection;

