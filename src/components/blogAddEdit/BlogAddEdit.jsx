import React from "react";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { blogApi } from "api";
import { blogSchema } from "utils";
import CloseIcon from "@mui/icons-material/Close";
import "./blogAddEdit.css";

const BlogAddEdit = ({ open, handleClose, blog, stopPropagation }) => {
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    try {
      if (blog) {
        await blogApi.updateBlog(formData, blog.id);
      } else {
        await blogApi.createBlog(formData);
      }
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {}
  };

  const initialValues = {
    title: blog?.title || "",
    content: blog?.content || "",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        onClick={stopPropagation}
        sx={{
          width: { xs: "80%", sm: "80%", md: "60%" },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "600px",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Box className="modal-header">
          <Typography className="blog-modal-title" id="modal-title" variant="h5">
            {blog ? "Edit Blog" : "Add Blog"}
          </Typography>
          <IconButton className="close-btn" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Formik initialValues={initialValues} validationSchema={blogSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Box className="form-field-box">
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  fullWidth
                  multiline
                  rows={2}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Box>

              <Box className="form-field-box">
                <Field
                  as={TextField}
                  name="content"
                  label="Content"
                  fullWidth
                  multiline
                  rows={13}
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                />
              </Box>

              <Box className="save-btn-box">
                <Button className="save-btn" variant="contained" color="primary" type="submit">
                  {blog ? "Update blog" : "Add blog"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default BlogAddEdit;

