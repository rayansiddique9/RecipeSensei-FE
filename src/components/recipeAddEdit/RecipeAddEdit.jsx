import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { recipeApi } from "api";
import { recipeSchema } from "utils";
import CloseIcon from "@mui/icons-material/Close";
import "./recipeAddEdit.css";

const RecipeAddEdit = ({ open, handleClose, recipe, stopPropagation }) => {
  const [imagePreview, setImagePreview] = useState(recipe?.image ? recipe.image : null);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("ingredients", values.ingredients);
    formData.append("instructions", values.instructions);
    values.image && formData.append("image", values.image);
    formData.append("is_public", values.makePublic);

    try {
      if (recipe) {
        await recipeApi.editRecipe(formData, recipe.id);
      } else {
        await recipeApi.addRecipe(formData);
      }
      handleClose();
      if (recipe) {
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch (error) {}
  };

  const initialValues = {
    title: recipe?.title || "",
    ingredients: recipe?.ingredients || "",
    instructions: recipe?.instructions || "",
    image: null,
    makePublic: recipe?.is_public || false,
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
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
          <Typography className="recipe-modal-title" id="modal-title" variant="h5">
            {recipe ? "Edit Recipe" : "Add Recipe"}
          </Typography>
          <IconButton className="close-btn" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Formik initialValues={initialValues} validationSchema={recipeSchema} onSubmit={handleSubmit}>
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
                  name="ingredients"
                  label="Ingredients"
                  fullWidth
                  multiline
                  rows={11}
                  error={touched.ingredients && Boolean(errors.ingredients)}
                  helperText={touched.ingredients && errors.ingredients}
                />
              </Box>

              <Box className="form-field-box">
                <Field
                  as={TextField}
                  name="instructions"
                  label="Instructions"
                  fullWidth
                  multiline
                  rows={14}
                  error={touched.instructions && Boolean(errors.instructions)}
                  helperText={touched.instructions && errors.instructions}
                />
              </Box>

              <Box className="form-field-box">
                {imagePreview && (
                  <Paper elevation={3} className="img-container">
                    <img src={imagePreview} alt="Preview" className="img" />
                  </Paper>
                )}

                <Button className="change-img-btn" variant="contained" component="label">
                  {recipe?.image ? "Change Image" : "Upload Image"}
                  <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, setFieldValue)} />
                </Button>
              </Box>

              <Box className="form-field-box">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values?.makePublic}
                      onChange={(event) => {
                        setFieldValue("makePublic", event.target.checked);
                      }}
                    />
                  }
                  label="Make Public"
                />
              </Box>

              <Box className="save-btn-box">
                <Button className="save-btn" variant="contained" color="primary" type="submit">
                  {recipe ? "Update Recipe" : "Add Recipe"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default RecipeAddEdit;

