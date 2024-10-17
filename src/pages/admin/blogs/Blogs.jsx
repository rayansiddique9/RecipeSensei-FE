import React, { useState } from "react";
import { Tabs, Tab, Box, useMediaQuery, useTheme } from "@mui/material";
import { blogApi } from "api";
import { BLOG_STATE } from "src/common";
import BlogsGrid from "./blogsGrid/BlogsGrid";
import "./blogs.css";

const Blogs = () => {
  const [tab, setTab] = useState(BLOG_STATE.APPROVED);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, tab) => {
    setTab(tab);
  };

  const blogTabs = [
    { label: "Approved", state: BLOG_STATE.APPROVED, queryKey: "approvedBlogs", queryFn: blogApi.getApprovedBlogs },
    { label: "Pending", state: BLOG_STATE.PENDING, queryKey: "pendingBlogs", queryFn: blogApi.getPendingBlogs },
    { label: "Rejected", state: BLOG_STATE.REJECTED, queryKey: "rejectedBlogs", queryFn: blogApi.getRejectedBlogs },
  ];

  return (
    <div className="main-blogs-page">
      <Box className="tabs-container">
        <Tabs
          orientation={isMobile || isTab ? "vertical" : "horizontal"}
          value={tab}
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
        {blogTabs.map((blogTab) => tab === blogTab.state && (
          <div key={blogTab.queryKey} className="blogs-section" id={blogTab.queryKey}>
            <BlogsGrid queryKey={blogTab.queryKey} queryFn={blogTab.queryFn} />
          </div>
        ))}
      </Box>
    </div>
  );
};

export default Blogs;

