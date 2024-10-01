import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Box, List } from "@mui/material";
import { blogApi } from "api";
import { Loader, BlogCard, SearchBar } from "components";
import { GLOBALS } from "common";
import "./blogs.css";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading: blogsLoading, refetch } = useQuery({
    queryKey: ["approvedBlogs", searchQuery, page],
    queryFn: () => blogApi.getApprovedBlogs({ pageParam: page, searchQuery }),
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const blogs = data?.results ?? [];
  const totalPages = Math.ceil(data?.count / GLOBALS.PAGE_SIZE) || 1;

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      refetch();
    },
    [refetch]
  );

  return blogsLoading ? (
    <Loader />
  ) : (
    <div className="blogs-container">
      <div className="search-bar-container">
        <SearchBar placeHolder="Search blogs" onSearch={handleSearch} initialValue={searchQuery} />
      </div>

      <Box className="user-blog-list">
        <List>
          {blogs.map((blog) => (
            <BlogCard blogDetails={blog} />
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </div>
  );
};

export default Blogs;

