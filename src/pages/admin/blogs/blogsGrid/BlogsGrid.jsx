import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Box, List } from "@mui/material";
import { Loader, BlogCard, ConfirmationDialog } from "components";
import { GLOBALS } from "common";
import "./blogsGrid.css";

const BlogsGrid = ({ queryKey, queryFn }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => queryFn({ pageParam: page }),
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const blogs = data?.results ?? [];
  const totalPages = Math.ceil(data?.count / GLOBALS.PAGE_SIZE) || 1;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <List className="admin-blog-list">
            {blogs.map((blog) => (
              <BlogCard blogDetails={blog} />
            ))}
          </List>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default BlogsGrid;

