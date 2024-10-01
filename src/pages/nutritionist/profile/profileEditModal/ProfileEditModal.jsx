import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "reduxStore";
import { Formik, Form, Field } from "formik";
import { nutritionistSingupSchema } from "utils";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./profileEditModal.css";

const ProfileEditModal = ({ open, handleClose, user }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const params = {
      user: {
        username: values.username,
        email: values.email,
        password: values.password
      },
      qualification: values.qualification,
      years_of_experience: values.yrsOfExperience
    }

    dispatch(profileActions.updateNutritionist(params));
    handleClose(true);
  };

  const initialValues = {
    username: user?.username || "",
    email: user?.email || "",
    yrsOfExperience: user?.yearsOfExperience || 1,
    qualification: user?.qualification || "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box className="modal-class"
        sx={{ width: { xs: "80%", sm: "80%", md: "60%" }, bgcolor: "background.paper" }}
      >
        <Box className="modal-header">
          <Typography id="modal-title" variant="h5" className="nutritionist-modal-title">
            Edit Profile
          </Typography>
          <IconButton className="close-btn" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={nutritionistSingupSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Box className="form-field-box">
                <Field className="form-field"
                  as={TextField}
                  name="username"
                  label="Username"
                  fullWidth
                  multiline
                  rows={1}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Box>

              <Box className="form-field-box">
                <Field className="form-field"
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  multiline
                  rows={1}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>

              <Box className="form-field-box">
                <Field className="form-field"
                  as={TextField}
                  name="qualification"
                  label="Qualification"
                  fullWidth
                  multiline
                  rows={1}
                  error={touched.qualification && Boolean(errors.qualification)}
                  helperText={touched.qualification && errors.qualification}
                />
              </Box>

              <Box className="form-field-box">
                <Field className="form-field"
                  as={TextField}
                  name="yrsOfExperience"
                  label="Years Of Experience"
                  fullWidth
                  multiline
                  rows={1}
                  error={touched.yrsOfExperience && Boolean(errors.yrsOfExperience)}
                  helperText={touched.yrsOfExperience && errors.yrsOfExperience}
                />
              </Box>

              <Box className="form-field-box">
                <Field className="form-field"
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  multiline
                  rows={1}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>

              <Box className="form-field-box">
                <Field className="form-field"
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  multiline
                  rows={1}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Box>

              <Box className="save-btn-box">
                <Button variant="contained" color="primary" type="submit" className="save-btn">
                  Save Changes
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ProfileEditModal;

