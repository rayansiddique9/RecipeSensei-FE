import React, { useState } from "react";
import { Tabs, Tab, Box, useMediaQuery, useTheme } from "@mui/material";
import { blogApi } from "api";
import BlogsGrid from "./blogsGrid/BlogsGrid";
import "./blogs.css";

const Blogs = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="main-blogs-page">
      <Box className="tabs-container">
        <Tabs
          orientation={isMobile || isTab ? "vertical" : "horizontal"}
          value={value}
          onChange={handleChange}
          aria-label="blog tabs"
          className="tabs"
          variant="fullWidth"
        >
          <Tab label="Approved" />
          <Tab label="Pending" />
          <Tab label="Rejected" />
        </Tabs>
      </Box>

      <Box className="blogs-content">
        {value === 0 && (
          <div className="blogs-section" id="approvedBlogs">
            <BlogsGrid queryKey="approvedBlogs" queryFn={blogApi.getApprovedBlogs} />
          </div>
        )}
        {value === 1 && (
          <div className="blogs-section" id="pendingBlogs">
            <BlogsGrid queryKey="pendingBlogs" queryFn={blogApi.getPendingBlogs} />
          </div>
        )}
        {value === 2 && (
          <div className="blogs-section" id="rejectedBlogs">
            <BlogsGrid queryKey="rejectedBlogs" queryFn={blogApi.getRejectedBlogs} />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Blogs;

