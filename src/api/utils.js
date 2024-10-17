import axios from "axios";
import axiosInstance from "./axiosInstance";
import { showErrorToast, showSuccessToast } from "./helpers";

const request = async (method, url, data = {}, withToken = true, throwError = false) => {
  const instance = withToken ? axiosInstance : axios;
  try {
    const config = { method, url };
    if (method.toLowerCase() === "get") {
      config.params = data;
    } else {
      config.data = data;
    }
    const response = await instance(config);
    showSuccessToast(response);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    showErrorToast(error);
    if (throwError) throw error;
  }
};

export const apiUtils = {
  get: (url, params = {}, withToken = true, throwError = false) =>
    request("get", url, params, withToken, throwError),

  put: (url, data = {}, withToken = true, throwError = false) =>
    request("put", url, data, withToken, throwError),

  post: (url, data = {}, withToken = true, throwError = false) =>
    request("post", url, data, withToken, throwError),

  patch: (url, data = {}, withToken = true, throwError = false) =>
    request("patch", url, data, withToken, throwError),

  delete: (url, params = {}, withToken = true, throwError = false) =>
    request("delete", url, params, withToken, throwError),
};

