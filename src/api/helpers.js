import { showToast } from "utils";
import { apiUtils } from "./utils";
import { errorCodes, successCodes } from "common";

export const showErrorToast = (error) => {
    let errorMessage = "";
    const status = error?.response?.status;

    if (error.response?.data?.user?.username) {
        errorMessage += error.response.data.user.username[0];
    } else if (error.response?.data?.detail) {
        errorMessage += error.response.data.detail;
    } else if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
    } else if (error.response?.data?.error) {
        errorMessage += error.response.data.error;
    } else if (error.response?.data) {
        errorMessage += error.response.data[0];
    } else if (status === errorCodes.SERVER_ERROR) {
        errorMessage = "An error occurred. Please try again.";
    }

    if (errorMessage) {
        showToast(errorMessage, "error");
    } else {
        showToast("An unknown error occurred. Please try again.", "error");
    }
};

export const showSuccessToast = (response) => {
    let successMessage = "";
    const status = response?.status;

    if (response?.data?.message) {
        successMessage = response.data.message;
    } else if (status === successCodes.NO_CONTENT && !response.data) {
        successMessage = "Deletion successful";
    } else if (status === successCodes.RESET_CONTENT && !response.data) {
        successMessage = "Logged out successfully";
    }

    if (successMessage) {
        showToast(successMessage, "success");
    } 
}

